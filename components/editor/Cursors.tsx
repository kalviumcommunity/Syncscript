import { useEffect, useMemo, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";

type AwarenessUser = {
  name: string;
  color: string;
  type: string;
};

type AwarenessState = {
  user: AwarenessUser;
};

type AwarenessList = [number, AwarenessState][];

interface CursorsProps {
  yProvider: LiveblocksYjsProvider;
}

export function Cursors({ yProvider }: CursorsProps) {
    const [awarenessUsers, setAwarenessUsers] = useState<Array<[number, AwarenessState]>>([]);

  useEffect(() => {
    function updateAwarenessUsers() {
        setAwarenessUsers(Array.from(yProvider.awareness.getStates()) as AwarenessList);
    }

    yProvider.awareness.on("change", updateAwarenessUsers);
    updateAwarenessUsers();

    return () => {
      yProvider.awareness.off("change", updateAwarenessUsers);
    };
  }, [yProvider]);

  const styleSheet = useMemo(() => {
    let cursorStyles = "";
    
    for (const [clientId, client] of awarenessUsers) {
      if (client?.user) {
        cursorStyles += `
          .yRemoteSelection-${clientId}, 
          .yRemoteSelectionHead-${clientId} {
            --user-color: ${client.user.color};
          }
          
          .yRemoteSelectionHead-${clientId}::after {
            content: "${client.user.name}";
            position: absolute;
            top: -1.4em;
            left: -1px;
            padding: 2px 4px;
            font-size: 12px;
            font-family: sans-serif;
            font-weight: bold;
            background-color: ${client.user.color};
            color: white;
            border-radius: 3px;
            white-space: nowrap;
          }
        `;
      }
    }

    return { __html: cursorStyles };
  }, [awarenessUsers]);

  return <style dangerouslySetInnerHTML={styleSheet} />;
}
