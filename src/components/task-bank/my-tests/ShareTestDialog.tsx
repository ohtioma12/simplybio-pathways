
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ShareTestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTest: { id: string; name: string } | null;
  getTestUrl: (testId: string) => string;
  copyTestLink: (testId: string) => void;
}

const ShareTestDialog: React.FC<ShareTestDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedTest,
  getTestUrl,
  copyTestLink
}) => {
  const navigate = useNavigate();

  if (!selectedTest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
            >
              Закрыть
            </Button>
            <Button 
              size="sm" 
              onClick={() => {
                navigate(`/test-solver/${selectedTest.id}`);
                onOpenChange(false);
              }}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Открыть вариант
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTestDialog;
