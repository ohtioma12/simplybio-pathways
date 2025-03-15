import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, BarChart } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useAuth } from '@/components/auth/AuthContext';
import { getUserTests, deleteTest, generateTestPdf } from './test-generator/pdfGenerator';
import { sampleTasks } from './data';
import { toast } from 'sonner';

// Import components
import PdfOptionsSection from './my-tests/PdfOptionsSection';
import TestsTable from './my-tests/TestsTable';
import ShareTestDialog from './my-tests/ShareTestDialog';
import UserStatistics from './user-statistics/UserStatistics';

const MyTestsButton: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [userTests, setUserTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showStatisticsDialog, setShowStatisticsDialog] = useState(false);
  const [pdfOptions, setPdfOptions] = useState({
    includeExplanations: false,
    includeAnswerKey: true
  });
  
  const loadTests = () => {
    if (!isAuthenticated) return;
    setUserTests(getUserTests(user?.id));
  };
  
  const handleOpenChange = (open: boolean) => {
    if (open) {
      loadTests();
    }
    setOpen(open);
  };
  
  const handleDeleteTest = (testId: string) => {
    if (deleteTest(testId, user?.id)) {
      toast.success('Вариант удален');
      loadTests();
    } else {
      toast.error('Ошибка при удалении варианта');
    }
  };

  const handleShareTest = (test: any) => {
    setSelectedTest(test);
    setShowShareDialog(true);
  };

  const getTestUrl = (testId: string) => {
    return `${window.location.origin}/test-solver/${testId}`;
  };

  const copyTestLink = (testId: string) => {
    const url = getTestUrl(testId);
    navigator.clipboard.writeText(url);
    toast.success('Ссылка скопирована в буфер обмена');
  };
  
  const handleDownloadPdf = (test: any) => {
    // Create taskOptions for the generateTestPdf function
    const taskOptions = test.tasks.map((taskId: number) => {
      const taskDetails = sampleTasks.find(t => t.id === taskId);
      if (!taskDetails) return null;
      
      // Generate taskCode if it doesn't exist
      const lineNumber = parseInt(taskDetails.line.replace('Линия ', ''), 10) || 0;
      
      // Fixed the error by renaming from task to taskDetails
      const generatedTaskCode = (taskDetails as any).taskCode || 
        `${lineNumber.toString().padStart(2, '0')}-${(taskId % 1000).toString().padStart(3, '0')}`;
      
      return {
        id: taskDetails.id,
        title: taskDetails.title,
        taskCode: generatedTaskCode,
        line: taskDetails.line || 'N/A',
        selected: true
      };
    }).filter(Boolean);
    
    const success = generateTestPdf(test.name, taskOptions, pdfOptions, sampleTasks);
    
    if (success) {
      toast.success('PDF успешно сгенерирован и скачан');
    } else {
      toast.error('Ошибка при генерации PDF');
    }
  };
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default" className="flex gap-2 items-center">
            <FileText className="h-4 w-4" />
            Мои варианты
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Мои варианты</DialogTitle>
            <DialogDescription>
              Здесь собраны все созданные вами варианты заданий
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-2 mb-4 flex justify-between items-center">
            <PdfOptionsSection 
              pdfOptions={pdfOptions} 
              setPdfOptions={setPdfOptions} 
            />
            
            <Button 
              variant="outline" 
              onClick={() => setShowStatisticsDialog(true)}
              className="flex gap-2 items-center"
            >
              <BarChart className="h-4 w-4" />
              Моя статистика
            </Button>
          </div>
          
          <TestsTable 
            tests={userTests}
            onDelete={handleDeleteTest}
            onDownloadPdf={handleDownloadPdf}
            onShare={handleShareTest}
            getTestUrl={getTestUrl}
            copyTestLink={copyTestLink}
          />
        </DialogContent>
      </Dialog>

      {/* Share Test Dialog */}
      <ShareTestDialog 
        isOpen={showShareDialog}
        onOpenChange={setShowShareDialog}
        selectedTest={selectedTest}
        getTestUrl={getTestUrl}
        copyTestLink={copyTestLink}
      />

      {/* Statistics Dialog */}
      {showStatisticsDialog && (
        <Dialog open={showStatisticsDialog} onOpenChange={setShowStatisticsDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Моя статистика</DialogTitle>
              <DialogDescription>
                Ваши результаты по решенным вариантам и заданиям
              </DialogDescription>
            </DialogHeader>
            <UserStatistics userId={user?.id} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MyTestsButton;
