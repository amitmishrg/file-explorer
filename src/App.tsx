import { FileExplorer } from '@/components/FileExplorer';
import { useFileOperation } from '@/hooks/useFileOperation';
import { EventContextProvider } from '@/context/EventTypeContext';
import { Console } from '@/components/Console';

import '@/App.css';

function App() {
  const { fileExplorerData, handleFileDetele, handleRenameFile } =
    useFileOperation();

  return (
    <EventContextProvider>
      <main>
        <aside>
          <h3>file-explorer</h3>
          <div className="explorer-wrapper">
            <FileExplorer
              explorerData={fileExplorerData}
              deleteFile={handleFileDetele}
              renameFile={handleRenameFile}
            />
          </div>
        </aside>

        <Console />
      </main>
    </EventContextProvider>
  );
}

export default App;
