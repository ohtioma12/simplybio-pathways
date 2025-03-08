
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { TaskOption } from './types';
import { toast } from 'sonner';

export const generateTestPdf = (
  testName: string,
  selectedTasks: TaskOption[]
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
    
    // Create task list table
    const tableData = selectedTasks.map((task, index) => [
      (index + 1).toString(), // Task number in sequence
      task.taskCode, // Task code
      task.line, // Line number
      task.title // Task title
    ]);
    
    // @ts-ignore - jsPDF autotable method
    doc.autoTable({
      head: [['№', 'Код', 'Линия', 'Название задания']],
      body: tableData,
      startY: 25,
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 25 }
    });
    
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

export const saveTestOnline = (testName: string, selectedTasks: TaskOption[]): string | null => {
  try {
    const testId = Date.now().toString();
    localStorage.setItem(`test_${testId}`, JSON.stringify({
      id: testId,
      name: testName,
      tasks: selectedTasks.map(task => task.id),
      createdAt: new Date().toISOString()
    }));
    
    toast.success('Вариант также доступен для решения онлайн');
    return testId;
  } catch (error) {
    console.error('Error saving test online:', error);
    return null;
  }
};
