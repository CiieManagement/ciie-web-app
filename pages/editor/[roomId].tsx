import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import io from 'socket.io-client';

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false });

export default function EditorPage() {
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState('// Start coding here');
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (!roomId) return;

    const newSocket = io('http://localhost:3000', {
      query: { roomId },
    });

    setSocket(newSocket);

    newSocket.on('code-change', (newCode) => {
      setCode(newCode);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket?.emit('code-change', newCode);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Collaborative Editor - Room: {roomId}
          </h1>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <MonacoEditor
              height="70vh"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}