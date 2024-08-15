import { Button } from '@headlessui/react';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface DictaphoneProps {
    searchCallback: (item:string) => void;
}

interface Command {
    command: string;
    callback: (item:any) => void;
}

const Dictaphone = ({searchCallback}:DictaphoneProps) => {
  const [listeningStatus, setListeningStatus] = useState(false);

  const commands : readonly Command[]  = [
    {
        command: '(Please) search *',
        callback: (item:any) => searchCallback(item)
    }
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

 

  const handleListingStatus = () => {
    setListeningStatus(!listeningStatus);
    if(listeningStatus === true)
    {
        resetTranscript();
        SpeechRecognition.startListening();

    }
    else 
    {
        SpeechRecognition.stopListening();
    }
 }

  return (
    <div className='flex items-center'>
      <Button className="h-fit p-2 rounded-full hover:bg-slate-600" onClick={handleListingStatus}>{listening ? '🔴':'🎤'}</Button>
    </div>
  );
};
export default Dictaphone;