
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { TaskOption, TestGenerationOptions, SavedTest } from './types';
import { toast } from 'sonner';
import { Task } from '../TaskCard';

// Add type augmentation for jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    } | undefined;
    autoTable: (options: any) => void;
  }
}

export const generateTestPdf = (
  testName: string,
  selectedTasks: TaskOption[],
  options: TestGenerationOptions = { includeExplanations: false, includeAnswerKey: false },
  allTasks: Task[] = []
): boolean => {
  if (selectedTasks.length === 0) {
    toast.error('Выберите хотя бы одно задание для генерации варианта');
    return false;
  }

  try {
    // Create PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text(testName, 105, 15, { align: 'center' });
    
    // Add variant information
    doc.setFontSize(11);
    doc.text(`Вариант для тренировки`, 105, 22, { align: 'center' });
    doc.text(`Сгенерировано: ${new Date().toLocaleDateString('ru-RU')}`, 105, 28, { align: 'center' });
    
    // Create task list table
    const tableData = selectedTasks.map((task, index) => [
      (index + 1).toString(), // Task number in sequence
      task.taskCode, // Task code
      task.line, // Line number
      task.title // Task title
    ]);
    
    // Using autotable method
    doc.autoTable({
      head: [['№', 'Код', 'Линия', 'Название задания']],
      body: tableData,
      startY: 35,
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 35 }
    });
    
    // Add access information
    const yPosition = doc.lastAutoTable?.finalY + 10 || 100;
    doc.setFontSize(10);
    doc.text("Для решения заданий онлайн перейдите по ссылке:", 14, yPosition);
    doc.setTextColor(0, 0, 255);
    doc.text(`${window.location.origin}/test-solver/`, 14, yPosition + 6);
    doc.setTextColor(0, 0, 0);
    doc.text("Введите код задания для доступа к каждому заданию.", 14, yPosition + 12);
    
    // If requested, add explanations
    if (options.includeExplanations) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Пояснения к заданиям', 105, 15, { align: 'center' });
      
      let yPosition = 30;
      
      selectedTasks.forEach((task, index) => {
        const taskDetails = allTasks.find(t => t.id === task.id);
        if (taskDetails?.explanation) {
          doc.setFontSize(12);
          doc.text(`Задание ${index + 1} (${task.taskCode}):`, 20, yPosition);
          
          doc.setFontSize(10);
          const explanationLines = doc.splitTextToSize(taskDetails.explanation, 170);
          doc.text(explanationLines, 20, yPosition + 7);
          
          yPosition += 15 + (explanationLines.length * 5);
          
          // Add a new page if running out of space
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
        }
      });
    }
    
    // If requested, add answer keys
    if (options.includeAnswerKey) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Ответы к заданиям', 105, 15, { align: 'center' });
      
      const answerKeyData = selectedTasks.map((task, index) => {
        const taskDetails = allTasks.find(t => t.id === task.id);
        return [
          (index + 1).toString(),
          task.taskCode,
          taskDetails?.correctAnswers?.[0] || taskDetails?.correctAnswer || 'Н/Д'
        ];
      });
      
      // Using autotable method
      doc.autoTable({
        head: [['№', 'Код задания', 'Ответ']],
        body: answerKeyData,
        startY: 25,
        headStyles: { fillColor: [41, 128, 185] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { top: 25 }
      });
    }
    
    // Save PDF
    doc.save(`${testName.replace(/\s+/g, '_')}.pdf`);
    
    // Show success message
    toast.success('Вариант успешно сгенерирован и скачан');

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Произошла ошибка при генерации варианта');
    return false;
  }
};

export const saveTestOnline = (
  testName: string, 
  selectedTasks: TaskOption[], 
  userId?: string
): string => {
  try {
    const testId = Date.now().toString();
    const savedTest: SavedTest = {
      id: testId,
      name: testName,
      tasks: selectedTasks.map(task => task.id),
      createdAt: new Date().toISOString(),
      createdBy: userId,
      isPublic: false
    };
    
    // Save to localStorage
    localStorage.setItem(`test_${testId}`, JSON.stringify(savedTest));
    
    // Also maintain a list of all tests for the current user
    const userTestsKey = `user_tests_${userId || 'anonymous'}`;
    const userTests = JSON.parse(localStorage.getItem(userTestsKey) || '[]');
    userTests.push(testId);
    localStorage.setItem(userTestsKey, JSON.stringify(userTests));
    
    toast.success('Вариант сохранен и доступен для решения онлайн');
    return testId;
  } catch (error) {
    console.error('Error saving test online:', error);
    toast.error('Ошибка при сохранении варианта');
    return '';
  }
};

export const getUserTests = (userId?: string): SavedTest[] => {
  try {
    const userTestsKey = `user_tests_${userId || 'anonymous'}`;
    const userTestIds = JSON.parse(localStorage.getItem(userTestsKey) || '[]');
    
    return userTestIds
      .map((testId: string) => {
        const testData = localStorage.getItem(`test_${testId}`);
        return testData ? JSON.parse(testData) : null;
      })
      .filter(Boolean)
      .sort((a: SavedTest, b: SavedTest) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (error) {
    console.error('Error fetching user tests:', error);
    return [];
  }
};

export const deleteTest = (testId: string, userId?: string): boolean => {
  try {
    // Remove the test
    localStorage.removeItem(`test_${testId}`);
    
    // Update the user's test list
    const userTestsKey = `user_tests_${userId || 'anonymous'}`;
    const userTests = JSON.parse(localStorage.getItem(userTestsKey) || '[]');
    const updatedTests = userTests.filter((id: string) => id !== testId);
    localStorage.setItem(userTestsKey, JSON.stringify(updatedTests));
    
    return true;
  } catch (error) {
    console.error('Error deleting test:', error);
    return false;
  }
};
