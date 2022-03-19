import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

export const GenerateMeme = () => {

  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const history = useHistory();

  const handleEnter = (e) => {

    e.persist()
    if(e.charCode===13){

      if(e.target.id==="input_0"){

        document.getElementById("input_1").focus();
      }
      if(e.target.id==="input_1"){

        generate()
      }
    }
  }

  const updateText = (e, index) => {
    
    const text = e.target.value || '';
    
    setCaptions(
    
      captions.map((c, i) => {
    
        if(index === i) return text;
        
        else return c;
      })
      
    );
  };

  const generate = () => {

    const empty = captions.every((c, index) => c==="")

    if(empty){
     
      alert("All Input fields cannot be empty, fill atleast one of them or You can put spaces instead!")
      document.getElementById("input_0").focus()
      return ;
    }

    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append('username', 'forcodingchallenge');
    formData.append('password', 'memesmemes');
    formData.append('template_id', currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    })
    
    .then(res => {
      res.json()
    
      .then(res => {
        history.push(`/generated?url=${res.data.url}`);
      });

    });

  };

  const skipMeme = () => {

    setMemeIndex(memeIndex + 1);
    document.getElementById("input_0").focus()
  }

  const shuffleMemes = (array) => {
    
    for (let i = array.length - 1; i > 0; i--) {
      
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(  () => {
    
    fetch('https://api.imgflip.com/get_memes')
    
    .then(res => {
      res.json()
    
      .then(res => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        const meme_list = _memes.filter(meme => meme.box_count===2)
        setMemes(meme_list);
      });
    })
    
    .catch(err => {
      alert(err);
    })

  }, []);

  useEffect(() => {
    if(memes.length) {
      setCaptions( Array(memes[memeIndex].box_count).fill("") );
    }
  }, [memes, memeIndex]);

  return(
    memes.length 
    
    ? 
    
    <div className={styles.container}>
     
      <button onClick={generate} className={styles.generate}>Generate Meme!</button>
      <button onClick={skipMeme} className={styles.skip}>Skip this Meme!</button>
     
      {
        captions.map((c, index) => (
          <input 
            onChange={(e) => updateText(e, index)} 
            onKeyPress={handleEnter} 
            key={index} 
            id={`input_${index}`} 
            autoFocus={index===0 ? true : false}
            placeholder={ index===0 ? "First Text" : "Second Text" } />
        ))
      }
     
      <img alt='empty_meme_image' src={memes[memeIndex].url} className={styles.img} />
    
    </div> 
    
    : 
    
    <>  </>
  );
};
