import MenuBar from './MenuBar';
import { Button } from '@/components/ui/button';

export default function Settings() {
    return (
        <div className="flex justify-between items-center p-4">
            <MenuBar />
            <div className="flex space-x-1">
                <Button>Start Data Stream</Button>
                <Button>Reset</Button>
                <Button>Save</Button>
            </div>
        </div>
    );
}
