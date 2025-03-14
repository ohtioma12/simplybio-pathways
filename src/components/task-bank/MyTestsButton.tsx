
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Link, Trash, ExternalLink, Download, Copy, BarChart } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserTests, deleteTest, generateTestPdf } from './test-generator/pdfGenerator';
import { sampleTasks } from './data';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import UserStatistics from './user-statistics/UserStatistics';

const MyTestsButton: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
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
      
      // Use a type assertion to tell TypeScript that we're handling the case where taskCode might not exist
      const generatedTaskCode = (taskDetails as any).taskCode || 
        `${lineNumber.toString().padStart(2, '0')}-${(taskDetails.id % 1000).toString().padStart(3, '0')}`;
      
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
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-explanations"
                  checked={pdfOptions.includeExplanations}
                  onCheckedChange={(checked) => 
                    setPdfOptions(prev => ({ ...prev, includeExplanations: !!checked }))
                  }
                />
                <label 
                  htmlFor="include-explanations" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Добавить пояснения к заданиям в PDF
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-answer-key"
                  checked={pdfOptions.includeAnswerKey}
                  onCheckedChange={(checked) => 
                    setPdfOptions(prev => ({ ...prev, includeAnswerKey: !!checked }))
                  }
                />
                <label 
                  htmlFor="include-answer-key" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Добавить ключи с ответами в PDF
                </label>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowStatisticsDialog(true)}
              className="flex gap-2 items-center"
            >
              <BarChart className="h-4 w-4" />
              Моя статистика
            </Button>
          </div>
          
          {userTests.length > 0 ? (
            <div className="overflow-y-auto max-h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead>Кол-во заданий</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTests.map((test: any) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>
                        {format(new Date(test.createdAt), 'dd MMM yyyy, HH:mm', { locale: ru })}
                      </TableCell>
                      <TableCell>{test.tasks.length}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Link className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/test-solver/${test.id}`)}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Открыть вариант
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyTestLink(test.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Копировать ссылку
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadPdf(test)}>
                              <Download className="mr-2 h-4 w-4" />
                              Скачать PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteTest(test.id)}
                              className="text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">У вас пока нет созданных вариантов</p>
              <Button onClick={() => setOpen(false)}>Создать первый вариант</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {showShareDialog && selectedTest && (
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Поделиться вариантом</DialogTitle>
              <DialogDescription>
                Отправьте эту ссылку ученикам для прохождения варианта
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Вариант: {selectedTest.name}</p>
                <div className="flex gap-2">
                  <Input 
                    value={getTestUrl(selectedTest.id)} 
                    readOnly 
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => copyTestLink(selectedTest.id)} 
                    size="sm"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Копировать
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowShareDialog(false)}
                >
                  Закрыть
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => {
                    navigate(`/test-solver/${selectedTest.id}`);
                    setShowShareDialog(false);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Открыть вариант
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Statistics Dialog */}
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
    </>
  );
};

export default MyTestsButton;
