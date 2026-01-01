import React, { useState, useEffect, useRef } from 'react';

// Your boot lines from script.js
const bootLines = [
  "Initializing neural interface... OK",
  "[ 2.20160524] sd 0:0:0:0:0ddbu22 [Ded] Assuming drive cache: write through",
  "Valid path for Logical Volume.",
  "",
  "/ubl/players: clean, 1704684/10121989 files, 3813638/7532544 blocks",
  "Started: Attempting to mount Dedware fuse mount.",
  "See \"systemctl status: 'runDedwarel\\fuse.mount'\" for details.",
  "",
  "[ 0.000000] init memory mappings [mem 0x00100000-0xdefaefff]",
  "[ 1.169734] [mem 0x00100000-0x01FFFFFF]",
  "[ 0.310006] NetLabel: protocols = UNLABELED DEOSce0v4",
  "",
  "Freeing initrd memory: 18780k (FFFF880035b42000 - FFFF880036d99000)",
  "PCI-DMA: Using softovare bounce buffering for IO (sfDed)",
  "",
  "status: Ok EXT4-Fs (sdal): orphan cleanup on readonly fs",
  "status: Ok EXT4-Fs (sdal): recovery complete",
  "status: Ok EXT4-Fs (sdal): mounted filesystem with ordered data mode.",
  "status: Ok Found BLUME MP-table mapped at [mem 0x10123989-0x000f9bff]",
  "",
  "Scanning 1 areas for low memory corruption",
  "Monitoring of Blume mirrors. ng dsmevendtd or progress polling.",
  "init_memory_mapping: [mem 0x00000000-0x000ACK]",
  "",
  "Mounted device Dedware: dedse00 login:",
  "",
  "Connecting to mainframe... ESTABLISHED",
  "Loading core modules... 100%",
  "Decrypting data stream...",
  "ACCESS GRANTED.",
  "Loading cyberdeck UI...",
  "Boot sequence complete. Welcome, user.",
];

function LoadingScreen({ onBootComplete }) {
  const [log, setLog] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("INITIALIZING... 0%");
  const terminalRef = useRef(null);

  useEffect(() => {
    let lineIndex = 0;
    
    function typeLine() {
      if (lineIndex < bootLines.length) {
        // This regex handles the "Ok" highlighting
        const lineHtml = bootLines[lineIndex].replace(
          /^(status: Ok)/,
          'status: <span style="color: var(--tertiary-color);">Ok</span>'
        );

        setLog((prevLog) => [...prevLog, lineHtml]);
        
        // Update progress
        const newProgress = Math.round(((lineIndex + 1) / bootLines.length) * 100);
        setProgress(newProgress);
        
        let statusText = "INITIALIZING";
        if (newProgress > 20) statusText = "LOADING MODULES";
        if (newProgress > 40) statusText = "DECRYPTING DATA";
        if (newProgress > 60) statusText = "CONNECTING TO MAINFRAME";
        if (newProgress > 80) statusText = "FINALIZING";
        setProgressText(`${statusText}... ${newProgress}%`);

        lineIndex++;
        // Auto-scroll
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }

        setTimeout(typeLine, 20 + Math.random() * 50);
      } else {
        // Boot sequence finished
        setProgress(100);
        setProgressText("COMPLETE... 100%");
        setTimeout(onBootComplete, 1000);
      }
    }

    setTimeout(typeLine, 500);
  }, [onBootComplete]);

  return (
    <div id="loading-screen">
      <div id="terminal" ref={terminalRef}>
        <p>&gt; BOOTING SYSTEM...</p>
        {log.map((line, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
        <span id="cursor" className="cursor"></span>
      </div>
      <div className="progress-container">
        <div className="progress-bar-container">
          <div 
            id="progress-bar" 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div id="progress-text" className="progress-text">
          {progressText}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;