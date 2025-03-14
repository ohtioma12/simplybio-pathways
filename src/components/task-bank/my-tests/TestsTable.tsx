
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link, Trash, ExternalLink, Download, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Test {
  id: string;
  name: string;
  createdAt: string;
  tasks: number[];
}

interface TestsTableProps {
  tests: Test[];
  onDelete: (testId: string) => void;
  onDownloadPdf: (test: Test) => void;
  onShare: (test: Test) => void;
  getTestUrl: (testId: string) => string;
  copyTestLink: (testId: string) => void;
}

const TestsTable: React.FC<TestsTableProps> = ({
  tests,
  onDelete,
  onDownloadPdf,
  onShare,
  getTestUrl,
  copyTestLink
}) => {
  const navigate = useNavigate();

  if (!tests.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">У вас пока нет созданных вариантов</p>
        <Button>Создать первый вариант</Button>
      </div>
    );
  }

  return (
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
          {tests.map((test) => (
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
                    <DropdownMenuItem onClick={() => onDownloadPdf(test)}>
                      <Download className="mr-2 h-4 w-4" />
                      Скачать PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(test.id)}
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
  );
};

export default TestsTable;
