import React, { useState } from 'react';
import styles from './styles.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import { saveAs } from 'file-saver'

export const MemeGenerated = () => {

  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');

  const copyLink = () => {
    
    clipboard.copy(url);
    setCopied(true);
  };

  const downloadImage = () => {
    
    saveAs(url, 'meme.jpg') 
  }

  return(
   
   <div className={styles.container}>
   
      <button onClick={() => history.push('/')} className={styles.home}>
        Make More Memes
      </button>
   
      { url && <img alt='generated_meme_img' src={url} className={styles.img} /> }
   
      <button onClick={copyLink} className={styles.copy}>
       
        {copied ? 'Link copied!' : 'Copy Meme link'}
      
      </button>
   
      <button onClick={downloadImage} className={styles.copy}>
        Download the Meme
      </button>
   
    </div>
  );
};
