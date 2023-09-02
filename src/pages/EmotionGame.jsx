import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EmotionGame.css";
import birthday from "../../src/image/birthday.png";
import aquarium from "../../src/image/aquarium.png";
import cinema from "../../src/image/cinema.png";
import ocean from "../../src/image/ocean.jpg";
import park from "../../src/image/park.jpeg";
import readingbook from "../../src/image/readingbook.jpg";
import swimming from "../../src/image/swimming.jpg";
import tiger from "../../src/image/tiger.jpg";
import toys from "../../src/image/toys.jpg";
import emotiongameimage from "../image/emotiongameimage.png";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const EmotionGame = () => {
  const navigate = useNavigate();

  // JOYFUL
  const stories_excited = [
    {
      image: birthday,
      text: "Today is my birthday. I am going to have a big birthday party with my friends. I am looking forward to it and I feel very…",
      correctEmotion: "excited",
    },
    {
      image: aquarium,
      text: "Today I am going to the aquarium with my sister. I look forward to see so many water animals. I feel very…",
      correctEmotion: "excited",
    },
    {
      image: cinema,
      text: "Today I will go to the cinema to watch my favorite cartoon. I feel very…",
      correctEmotion: "excited",
    },
  ];

  // JOYFUL
  const stories_happy = [
    {
      image: park,
      text: "Today my mom took me to the playground and bought me my favorite ice cream. I felt very…",
      correctEmotion: "happy",
    },
    {
      image: readingbook,
      text: "Today my brother read two of my favorite books to me. I love my brother and I felt very…",
      correctEmotion: "happy",
    },
    {
      image: swimming,
      text: "Today I visited my grandparents and I swam in the lake with them. I felt very… ",
      correctEmotion: "happy",
    },
  ];

  // JOYFUL
  const stories_creative = [
    {
      image: ocean,
      text: "Yesterday, I did an ocean art project. My idea was to mix blue and white colors for the ocean. The ocean looked so beautiful at the end. I felt very…",
      correctEmotion: "creative",
    },
    {
      image: toys,
      text: "Today I organized my toys in a completely different way. Instead of putting all my pretend animals in one basket, I divided them into two groups - water and land animals. I felt very…",
      correctEmotion: "creative",
    },
    {
      image: tiger,
      text: "My sister helped me do a tiger puppet on paper. And then an idea came to my mind. I wanted to add teeth to the tiger puppet. And it looked very beautiful at the end. I felt very… ",
      correctEmotion: "creative",
    },
  ];

  // POWERFUL
  const stories_proud = [
    {
      image: emotiongameimage,
      text: "Today I had a competition in my school. We all had to line up and run, whoever ran fastest would win the medal and the Cup. I focused on the competition and I won. I was feeling very…",
      correctEmotion: "proud",
    },
    {
      image: emotiongameimage,
      text: "Today my friend did the best art project in class and we all loved it. I was feeling very…",
      correctEmotion: "proud",
    },
    {
      image: emotiongameimage,
      text: "Today I got ready for school all by myself. I wore my uniform and packed my backpack all by myself. I was feeling very…",
      correctEmotion: "proud",
    },
  ];

  // POWERFUL
  const stories_confident = [
    {
      image: emotiongameimage,
      text: "Today my dad offered to help me put on my shoes, but I told my dad that I don't need help, I can put them on by myself. I was feeling very…",
      correctEmotion: "confident",
    },
    {
      image: emotiongameimage,
      text: "Today I came back from school, washed my hands and ate lunch. After finishing I saw my mom folding clothes and I asked her to teach me how to fold clothes. She taught me and I could do it all by myself. I was feeling very…",
      correctEmotion: "confident",
    },
    {
      image: emotiongameimage,
      text: "Today I brushed my teeth all by myself. I brushed them everywhere and I made sure there was no food left. It was my first time to do it by myself. I was feeling very…",
      correctEmotion: "confident",
    },
  ];

  // POWERFUL
  const stories_surprised = [
    {
      image: emotiongameimage,
      text: "Today my friend sat on a balloon and the balloon popped. Nobody was expecting it would pop, thus we all got…",
      correctEmotion: "surprised",
    },
    {
      image: emotiongameimage,
      text: "Today my mom was supposed to pick me up from school, but instead my Grandfather came to pick me up. I was so happy and I felt very…",
      correctEmotion: "surprised",
    },
    {
      image: emotiongameimage,
      text: "Today was my birthday. My mom invited all my friends. I was looking around the room and i couldn't find my best friend, then all of a sudden he came out of a huge present box. I was laughing and I felt so…",
      correctEmotion: "surprised",
    },
  ];

  // PEACEFUL
  const stories_thoughtful = [
    {
      image: emotiongameimage,
      text: "Today I fell down in the park and I was crying. One child in the park came and comforted me. She was very…",
      correctEmotion: "thoughtful",
    },
    {
      image: emotiongameimage,
      text: "Today when me and my friend went outside, it started raining. I forgot my umbrella at home and my friend offered that we both go inside her umbrella. She was very…",
      correctEmotion: "thoughtful",
    },
    {
      image: emotiongameimage,
      text: "Today my friend fell off his bike. When I saw that he fell down, I ran to see if he was okay and I tried to comfort him. I was being very…",
      correctEmotion: "thoughtful",
    },
  ];

  // PEACEFUL
  const stories_thankful = [
    {
      image: emotiongameimage,
      text: "Today was my birthday. My friends and my family organized a beautiful birthday party. I felt very…",
      correctEmotion: "thankful",
    },
    {
      image: emotiongameimage,
      text: "My teacher teaches me so many new and cool things every day. She is an amazing teacher. I sent her a beautiful present today and I feel very…",
      correctEmotion: "thankful",
    },
    {
      image: emotiongameimage,
      text: "My friend shared her favorite car with me. She always shares with me and makes me laugh. I love her and I feel very…",
      correctEmotion: "thankful",
    },
  ];

  // PEACEFUL
  const stories_secure = [
    {
      image: emotiongameimage,
      text: "Today I saw an insect in the park. I ran as fast as possible to my dad. My dad told me that it was just an ant and I didn’t have to be scared of it. I felt very…",
      correctEmotion: "secure",
    },
    {
      image: emotiongameimage,
      text: "Today I passed the street together with my friend and the crossing guard stopped all the cars, so we could pass. I was feeling very…",
      correctEmotion: "secure",
    },
    {
      image: emotiongameimage,
      text: "Today I went to visit my grandparents. I wanted to go and get ice cream but I felt scared to go by myself, - But my grandpa comforted me and he told me, he will come with me to get ice cream. I felt very. I was feeling very…",
      correctEmotion: "secure",
    },
  ];

  // SCARED
  const stories_anxious = [
    {
      image: emotiongameimage,
      text: "Yesterday I climbed up Climbers and I went so high. When I reached the highest part I didn’t know if I should come down because I thought I might fall. I was feeling…",
      correctEmotion: "anxious",
    },
    {
      image: emotiongameimage,
      text: "Today I went to school and I saw a huge insect crawling on the doorstep. I got really scared and I felt very…",
      correctEmotion: "anxious",
    },
    {
      image: emotiongameimage,
      text: "My friend and I poked a bumble bee today, and the bumble bee started chasing us. We were running so fast. I was feeling very…",
      correctEmotion: "anxious",
    },
  ];

  // SCARED
  const stories_confused = [
    {
      image: emotiongameimage,
      text: "Today I spun at home many times. When I stopped spinning, my home kept still turning and I almost fell down. I was feeling very…",
      correctEmotion: "confused",
    },
    {
      image: emotiongameimage,
      text: "Today my teacher told me to clean up my toys, and at the same time she told me to pass her the train trucks. I didn't know which instruction to follow first. I was feeling very…",
      correctEmotion: "confused",
    },
    {
      image: emotiongameimage,
      text: "Today my mom told me to do my homework. We learnt two letters today “A” and “B”, but we only had to do homework for one of the letters. I didnt know which one, I was feeling very…",
      correctEmotion: "confused",
    },
  ];

  // SCARED
  const stories_overwhelmed = [
    {
      image: emotiongameimage,
      text: "Today I did so many things. I played with my friends outside and went to the zoo. I didn't finish my food and I missed my naptime. At the end of the day, I felt like I couldn’t function anymore. I was feeling…",
      correctEmotion: "overwhelmed",
    },
    {
      image: emotiongameimage,
      text: "Today I went to the subway for the first time. There were so many people and it was so loud and a little scary. I couldn't hear anything and I was feeling…",
      correctEmotion: "overwhelmed",
    },
    {
      image: emotiongameimage,
      text: "Today I went to the trampoline with my friends. The trampoline was small and there were so many people. I was feeling…",
      correctEmotion: "overwhelmed",
    },
  ];

  // SAD
  const stories_tired = [
    {
      image: emotiongameimage,
      text: "Today I raced with my friend and we did many rounds. My friend asked me if I wanted to go and climb but I told my friend - ”I need to breathe and rest first”. I was feeling very…",
      correctEmotion: "tired",
    },
    {
      image: emotiongameimage,
      text: "Today I didn't sleep too much, I woke up very early and I couldn't have a nap. At the end of the day I was feeling very…",
      correctEmotion: "tired",
    },
    {
      image: emotiongameimage,
      text: "Today was very hot outside. I walked a long distance till I arrived at my home. I was feeling very…",
      correctEmotion: "tired",
    },
  ];

  // SAD
  const stories_bored = [
    {
      image: emotiongameimage,
      text: "Today it was raining and I couldn't go outside. I was at home all day and I felt…",
      correctEmotion: "bored",
    },
    {
      image: emotiongameimage,
      text: "Today I was supposed to have a playdate with my friend, but i couldn't because my friend wasn't feeling well. I stayed home all day and I felt very…",
      correctEmotion: "bored",
    },
    {
      image: emotiongameimage,
      text: "Today my mom and my dad were very busy around the house and they couldn't play with me. I didn't know what to do and I was feeling very…",
      correctEmotion: "bored",
    },
  ];

  // SAD
  const stories_guilty = [
    {
      image: emotiongameimage,
      text: "My mom and my dad always tell me that I should eat the food on my table but today I decided to eat it on the sofa and I ended up spilling it. My parents weren't so happy about it. I felt very…",
      correctEmotion: "guilty",
    },
    {
      image: emotiongameimage,
      text: "Today I ripped my sister's book on purpose. My sister was so upset, because she needed the book to finish her homework. I recognized my mistake and I told her I am sorry because I was feeling very…",
      correctEmotion: "guilty",
    },
    {
      image: emotiongameimage,
      text: "Today I took my friend's shoe and I threw it in the class. My teacher saw what I did and she told me that I am not supposed to do that. I said “I am sorry” to my friend and to my teacher, because I was feeling very…",
      correctEmotion: "guilty",
    },
  ];

  // MAD
  const stories_angry = [
    {
      image: emotiongameimage,
      text: "Today my sister took my toy without asking me first. I was feeling very…",
      correctEmotion: "angry",
    },
    {
      image: emotiongameimage,
      text: "Today my friend pushed me on purpose and I fell on the ground. She didn't say 'I am sorry', she just walked away. I was feeling very…",
      correctEmotion: "angry",
    },
    {
      image: emotiongameimage,
      text: "Today my mom and I went to the park. I started playing with my friends but my mom told me that I have to go home and I didn't want to go home. I was feeling very…",
      correctEmotion: "angry",
    },
  ];

  // MAD
  const stories_frustrated = [
    {
      image: emotiongameimage,
      text: "Today my friend asked me for my dad's name. I said the name 5 times and he didn't get it. After multiple attempts, I felt very…",
      correctEmotion: "frustrated",
    },
    {
      image: emotiongameimage,
      text: "Today I went to the playground with my mom. My mom bought me an ice cream and I dropped it accidentally on the floor. I was feeling very…",
      correctEmotion: "frustrated",
    },
    {
      image: emotiongameimage,
      text: "Today I was doing a puzzle in my class when my friend came and stepped on it and ruined it. I was feeling very…",
      correctEmotion: "frustrated",
    },
  ];

  // MAD
  const stories_skeptical = [
    {
      image: emotiongameimage,
      text: "Today I went to the aquarium and I saw a Jellyfish. My friend told me that it was an Octopus. I was feeling very…",
      correctEmotion: "skeptical",
    },
    {
      image: emotiongameimage,
      text: "Today my mom took me to the park. She gave me two choices for a snack: a donut or an ice cream. I liked both of them and didn't know which one to choose. I was feeling very…",
      correctEmotion: "skeptical",
    },
    {
      image: emotiongameimage,
      text: "Today my friend told me that tomato is a vegetable, but I read a book that says that tomato is a fruit, but he insisted that he was right. I was feeling very…",
      correctEmotion: "skeptical",
    },
  ];

  //emotion1
  const story_set_joyful = [
    ...stories_excited,
    ...stories_happy,
    ...stories_creative,
  ];

  //emotion2
  const story_set_powerful = [
    ...stories_proud,
    ...stories_confident,
    ...stories_surprised,
  ];

  //emotion3
  const story_set_peaceful = [
    ...stories_thoughtful,
    ...stories_thankful,
    ...stories_secure,
  ];

  //emotion4
  const story_set_scared = [
    ...stories_anxious,
    ...stories_confused,
    ...stories_overwhelmed,
  ];

  //emotion5
  const story_set_sad = [
    ...stories_tired,
    ...stories_bored,
    ...stories_guilty,
  ];
  
  //emotion6
  const story_set_mad = [
    ...stories_angry,
    ...stories_frustrated,
    ...stories_skeptical,
  ];

  //All emotions with all the stories
  const questions = [
    ...story_set_joyful,
    ...story_set_powerful,
    ...story_set_peaceful,
    ...story_set_scared,
    ...story_set_sad,
    ...story_set_mad,
  ];

  // State for current question
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // State for score 
  const [score, setScore] = useState(0);

  const emotions = ["excited", "happy", "creative", "proud", "confident", "surprised", "thoughtful", "thankful", "secure", "anxious", "confused", "overwhelmed", "tired", "bored", "guilty", "angry", "frustrated", "skeptical"];

  // Randomly select a question when the component is mounted
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, []);

  const handleBackClick = () => {
    setScore(0);
    navigate("/");
  };

  let emotionsToDisplay = [];
  if (currentQuestion) {
    emotionsToDisplay = [
      currentQuestion.correctEmotion,
      ...emotions
        .filter((emotion) => emotion !== currentQuestion.correctEmotion)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2),
    ];
  }

  const handleEmotionClick = (emotion) => {
    if (currentQuestion.correctEmotion === emotion) {
      setScore(score + 1);
      navigate("/correct", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    } else {
      navigate("/incorrect", {
        state: { emotion: currentQuestion.correctEmotion },
      });
    }
  };

  return (
    <div className="emotion-main">
      <div className="emotion-top-bar">
        <div className="emotion-back-button" onClick={handleBackClick}>
          <FaArrowAltCircleLeft size={40} />
        </div>
      </div>
      <div className="emotion-picture">
        {currentQuestion && <img src={currentQuestion.image} />}
      </div>
      <div className="emotion-description">
        {currentQuestion && <h3>{currentQuestion.text}</h3>}
        <br />
        Select the correct feeling:
      </div>
      <div className="emotion-options">
        {emotionsToDisplay.map((emotion) => (
          <div className="option-choice">
            <div
              className={emotion.toLowerCase()}
              onClick={() => handleEmotionClick(emotion)}
            ></div>
            <h3 style={{ margin: "0" }}>{emotion}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionGame;
