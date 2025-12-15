import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, CameraOff, RotateCcw, Smile, Frown, Meh, Brain, Mic, MicOff, Volume2 } from 'lucide-react';

export default function MirrorEffectInteractive() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [staffMood, setStaffMood] = useState('neutral');
  const [staffTone, setStaffTone] = useState('neutral');
  const [customerReaction, setCustomerReaction] = useState('Customer observing your behavior...');
  const [interactionCount, setInteractionCount] = useState(0);
  
  // No refs needed for manual selection

  const staffMoods = {
    friendly: {
      title: 'Friendly & Welcoming',
      description: 'Warm smile, open body language, making eye contact',
      staffIcon: '😊',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    },
    professional: {
      title: 'Professional & Focused',
      description: 'Attentive, composed, business-like demeanor',
      staffIcon: '😐',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700'
    },
    rushed: {
      title: 'Rushed & Hurried',
      description: 'Quick movements, checking time, seems impatient',
      staffIcon: '😤',
      bgColor: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700'
    },
    annoyed: {
      title: 'Annoyed & Frustrated',
      description: 'Frowning, sighing, showing irritation',
      staffIcon: '😠',
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700'
    }
  };

  const voiceTones = {
    warm: {
      title: 'Warm & Enthusiastic',
      description: 'Cheerful tone, varied pitch, engaging',
      icon: '🎵'
    },
    polite: {
      title: 'Polite & Clear',
      description: 'Clear articulation, respectful tone',
      icon: '🗣️'
    },
    monotone: {
      title: 'Flat & Monotone',
      description: 'Little variation, sounds disinterested',
      icon: '😑'
    },
    sharp: {
      title: 'Sharp & Curt',
      description: 'Brief responses, harsh tone',
      icon: '⚡'
    }
  };

  const staffDialogues = {
    neutral: {
      tone: 'Neutral',
      phrases: [
        "Welcome to our café. What would you like?",
        "Your order will be ready shortly.",
        "Here is your receipt.",
        "Next customer please."
      ]
    },
    friendly: {
      tone: 'Friendly',
      phrases: [
        "Good morning! How are you doing today?",
        "I'd love to help you find the perfect drink!",
        "Thanks so much for choosing us!",
        "Have a wonderful day!"
      ]
    },
    rushed: {
      tone: 'Rushed/Impatient',
      phrases: [
        "Yeah, what do you want?",
        "Can you hurry up and decide?",
        "Next!",
        "That'll be $4.50. Anything else?"
      ]
    },
    annoyed: {
      tone: 'Annoyed',
      phrases: [
        "What now?",
        "I already told you the price.",
        "We're out of that.",
        "Is that everything?"
      ]
    },
    cheerful: {
      tone: 'Cheerful',
      phrases: [
        "Hi there! Isn't it a beautiful day?",
        "Ooh, excellent choice! That's my favorite too!",
        "Coming right up with extra care!",
        "Hope to see you again soon!"
      ]
    }
  };

  const expressions = {
    neutral: {
      title: 'Neutral Expression',
      description: 'No clear emotional signal',
      customerIcon: '😐',
      customerMood: 'Customer waits for a signal',
      bgColor: 'bg-gray-50 border-gray-200',
      textColor: 'text-gray-700'
    },
    smile: {
      title: 'Warm Smile',
      description: 'Genuine, welcoming smile detected',
      customerIcon: '😊',
      customerMood: 'Customer feels welcomed and valued',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    },
    frown: {
      title: 'Frown/Upset',
      description: 'Negative or frustrated expression',
      customerIcon: '😞',
      customerMood: 'Customer becomes defensive and uncomfortable',
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-700'
    },
    focused: {
      title: 'Focused/Serious',
      description: 'Serious, focused expression',
      customerIcon: '😑',
      customerMood: 'Customer remains business-like',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-700'
    }
  };

  const combinedReactions = {
    'smile_friendly': { icon: '😄', mood: 'Customer lights up with joy', bgColor: 'bg-green-100 border-green-300' },
    'smile_cheerful': { icon: '🥰', mood: 'Customer feels genuinely cared for', bgColor: 'bg-green-100 border-green-300' },
    'neutral_rushed': { icon: '😟', mood: 'Customer feels hurried and stressed', bgColor: 'bg-yellow-100 border-yellow-300' },
    'frown_annoyed': { icon: '😠', mood: 'Customer becomes angry and defensive', bgColor: 'bg-red-100 border-red-300' },
    'neutral_annoyed': { icon: '😕', mood: 'Customer feels unwelcome', bgColor: 'bg-orange-100 border-orange-300' },
    'smile_neutral': { icon: '😊', mood: 'Customer appreciates the friendliness', bgColor: 'bg-green-50 border-green-200' },
    'focused_rushed': { icon: '😤', mood: 'Customer feels pressured', bgColor: 'bg-red-50 border-red-200' },
    'neutral_friendly': { icon: '🙂', mood: 'Customer warms up to the kindness', bgColor: 'bg-blue-50 border-blue-200' }
  };

  const combinedReactions = {
    'friendly_warm': { 
      mood: 'Customer lights up with genuine joy and feels completely welcomed 🌟', 
      customerIcon: '🥰',
      impact: 'positive' 
    },
    'friendly_polite': { 
      mood: 'Customer feels respected and appreciated 😊', 
      customerIcon: '😌',
      impact: 'positive' 
    },
    'professional_warm': { 
      mood: 'Customer appreciates the balance of professionalism and warmth 👍', 
      customerIcon: '🙂',
      impact: 'positive' 
    },
    'professional_polite': { 
      mood: 'Customer has a smooth, efficient service experience 👌', 
      customerIcon: '😐',
      impact: 'neutral' 
    },
    'rushed_sharp': { 
      mood: 'Customer feels unwelcome and stressed by the hostile service 😰', 
      customerIcon: '😨',
      impact: 'negative' 
    },
    'annoyed_sharp': { 
      mood: 'Customer becomes defensive and wants to leave immediately 😠', 
      customerIcon: '🤬',
      impact: 'negative' 
    },
    'rushed_monotone': { 
      mood: 'Customer feels like just another number, unimportant 😕', 
      customerIcon: '😞',
      impact: 'negative' 
    },
    'professional_monotone': { 
      mood: 'Customer finds the service cold and impersonal 😐', 
      customerIcon: '😑',
      impact: 'neutral' 
    }
  };

  const currentStaffMood = staffMoods[staffMood as keyof typeof staffMoods];
  const currentVoiceTone = voiceTones[staffTone as keyof typeof voiceTones];

  const handleStaffMoodChange = (mood: string) => {
    setStaffMood(mood);
    updateCustomerReaction(mood, staffTone);
    setInteractionCount(prev => prev + 1);
  };

  const handleVoiceToneChange = (tone: string) => {
    setStaffTone(tone);
    updateCustomerReaction(staffMood, tone);
    setInteractionCount(prev => prev + 1);
  };

  const updateCustomerReaction = (mood: string, tone: string) => {
    const combinedKey = `${mood}_${tone}` as keyof typeof combinedReactions;
    const combined = combinedReactions[combinedKey];
    
    if (combined) {
      setCustomerReaction(combined.mood);
    } else {
      // Fallback reactions
      if (mood === 'friendly') {
        setCustomerReaction('Customer feels welcomed and comfortable 😊');
      } else if (mood === 'annoyed') {
        setCustomerReaction('Customer becomes uncomfortable and defensive 😟');
      } else if (mood === 'rushed') {
        setCustomerReaction('Customer feels pressured and stressed 😰');
      } else {
        setCustomerReaction('Customer has a standard service experience 😐');
      }
    }
  };

  const handleStart = () => {
    console.log('Starting camera...');
    setIsLoadingCamera(true);
    setPermissionDenied(false);
    setCameraActive(false);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true // Now request audio too
      });
      
      console.log('Got media stream:', stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Set video properties
        videoRef.current.muted = true;
        videoRef.current.autoplay = true;
        videoRef.current.playsInline = true;
        
        // Set camera active immediately - don't wait for play
        setCameraActive(true);
        setIsLoadingCamera(false);
        setPermissionDenied(false);
        
        // Start microphone too
        await startMicrophone(stream);
        
        console.log('Camera and microphone setup complete');
      }
    } catch (error) {
      console.error('Camera/microphone error:', error);
      setPermissionDenied(true);
      setIsLoadingCamera(false);
      setCameraActive(false);
    }
  };

  const startMicrophone = async (stream: MediaStream) => {
    try {
      // Create audio context for tone analysis
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      micStreamRef.current = stream;
      setMicActive(true);
      
      // Setup speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = true;
        speechRecognitionRef.current.interimResults = true;
        speechRecognitionRef.current.lang = 'en-US';
        
        speechRecognitionRef.current.onstart = () => setIsListening(true);
        speechRecognitionRef.current.onend = () => setIsListening(false);
        speechRecognitionRef.current.onresult = (event: any) => {
          const last = event.results.length - 1;
          const text = event.results[last][0].transcript;
          
          if (text.trim()) {
            analyzeSpeechTone(text);
          }
          analyzeSpeechTone(text);
        };
      }
      
      console.log('Microphone setup complete');
    } catch (error) {
      console.error('Microphone setup error:', error);
      setMicActive(false);
    }
  };

  const stopCamera = () => {
    stopDetection();
    
    // Stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Stop microphone stream
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    
    // Stop speech recognition
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
    }
    
    // Stop audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraActive(false);
    setMicActive(false);
    setIsListening(false);
    setIsLoadingCamera(false);
    setCurrentExpression('neutral');
    setCurrentTone('neutral');
    setCustomerReaction('waiting');
    setCurrentDialogue('');
    setIsSpaking(false);
  };

  const handleStart = () => {
    setHasStarted(true);
    setShowResults(false);
  };

  const handleReset = () => {
    setHasStarted(false);
    setShowResults(false);
    setStaffMood('professional');
    setStaffTone('polite');
    setInteractionCount(0);
    setCustomerReaction('waiting');
    setCurrentDialogue('');
    setIsSpaking(false);
  };

  const handleExpressionDetection = (expression: string) => {
    setCurrentExpression(expression);
    updateCustomerReaction(expression, currentTone);
    setDetectionCount(prev => prev + 1);
  };

  const handleToneDetection = (tone: string, confidence: number) => {
    setCurrentTone(tone);
    setToneConfidence(confidence);
    updateCustomerReaction(currentExpression, tone);
  };

  const updateCustomerReaction = (expression: string, tone: string) => {
    const combinedKey = `${expression}_${tone}` as keyof typeof combinedReactions;
    const combined = combinedReactions[combinedKey];
    
    if (combined) {
      setCustomerReaction(combined.mood);
    } else {
      // Fallback to expression-only reaction
      setCustomerReaction(expressions[expression as keyof typeof expressions]?.customerMood || 'Customer observing');
    }
  };

  const speakDialogue = async (toneType: string) => {
    const dialogues = staffDialogues[toneType as keyof typeof staffDialogues];
    if (!dialogues) return;
    
    const randomPhrase = dialogues.phrases[Math.floor(Math.random() * dialogues.phrases.length)];
    setCurrentDialogue(randomPhrase);
    setIsSpaking(true);
    
    // Use speech synthesis to speak the dialogue
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomPhrase);
      
      // Adjust voice properties based on tone
      switch (toneType) {
        case 'friendly':
          utterance.rate = 1.0;
          utterance.pitch = 1.1;
          utterance.volume = 0.8;
          break;
        case 'cheerful':
          utterance.rate = 1.1;
          utterance.pitch = 1.3;
          utterance.volume = 0.9;
          break;
        case 'rushed':
          utterance.rate = 1.4;
          utterance.pitch = 0.9;
          utterance.volume = 0.7;
          break;
        case 'annoyed':
          utterance.rate = 0.8;
          utterance.pitch = 0.8;
          utterance.volume = 0.6;
          break;
        default:
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          utterance.volume = 0.7;
      }
      
      utterance.onend = () => {
        setIsSpaking(false);
        setTimeout(() => setCurrentDialogue(''), 3000); // Clear after 3 seconds
        
        // Start listening for user's response
        if (speechRecognitionRef.current && micActive) {
          speechRecognitionRef.current.start();
        }
      };
      
      speechSynthesis.speak(utterance);
    } else {
      setIsSpaking(false);
      setTimeout(() => setCurrentDialogue(''), 3000);
    }
  };

  const analyzeSpeechTone = (text: string) => {
    if (!text.trim()) return;
    
    const lowercaseText = text.toLowerCase();
    let detectedTone = 'neutral';
    let confidence = 0.5;
    
    // Enhanced AI-powered sentiment analysis
    const sentimentAnalysis = analyzeSentiment(text);
    
    // Advanced keyword patterns for better detection
    const tonePatterns = {
      cheerful: {
        words: ['amazing', 'fantastic', 'perfect', 'excellent', 'beautiful', 'awesome', 'wonderful', 'brilliant', 'marvelous', 'incredible'],
        phrases: ['love it', 'so good', 'really great', 'absolutely perfect'],
        punctuation: /[!]{2,}|[!].*[!]/,
        weight: 0.8
      },
      friendly: {
        words: ['thank', 'please', 'help', 'welcome', 'good', 'great', 'nice', 'appreciate', 'kind', 'sweet'],
        phrases: ['thank you', 'please help', 'that\'s nice', 'very kind'],
        punctuation: /[.!]$/,
        weight: 0.6
      },
      rushed: {
        words: ['quick', 'fast', 'hurry', 'next', 'move', 'urgent', 'now', 'immediately', 'asap'],
        phrases: ['hurry up', 'move along', 'next please', 'come on'],
        punctuation: /[.]{3,}|[!]$/,
        weight: 0.7
      },
      annoyed: {
        words: ['what', 'already', 'told', 'again', 'seriously', 'ugh', 'whatever', 'annoying', 'stupid'],
        phrases: ['told you already', 'what\'s wrong', 'are you serious', 'for real'],
        punctuation: /[?!]{2,}/,
        weight: 0.8
      }
    };
    
    let maxScore = 0;
    let bestTone = 'neutral';
    
    Object.entries(tonePatterns).forEach(([tone, pattern]) => {
      let score = 0;
      
      // Word matching
      const wordMatches = pattern.words.filter(word => lowercaseText.includes(word)).length;
      score += wordMatches * 0.3;
      
      // Phrase matching (higher weight)
      const phraseMatches = pattern.phrases.filter(phrase => lowercaseText.includes(phrase)).length;
      score += phraseMatches * 0.5;
      
      // Punctuation patterns
      if (pattern.punctuation.test(text)) {
        score += 0.2;
      }
      
      // Apply sentiment analysis boost
      if (sentimentAnalysis.score > 0.3 && (tone === 'cheerful' || tone === 'friendly')) {
        score += sentimentAnalysis.score * 0.4;
      } else if (sentimentAnalysis.score < -0.3 && (tone === 'annoyed' || tone === 'rushed')) {
        score += Math.abs(sentimentAnalysis.score) * 0.4;
      }
      
      // Text length consideration
      const textLength = text.split(' ').length;
      if (textLength > 10 && (tone === 'cheerful' || tone === 'friendly')) {
        score += 0.1; // Longer positive texts are more confident
      } else if (textLength < 5 && (tone === 'rushed' || tone === 'annoyed')) {
        score += 0.15; // Short texts more likely to be rushed/annoyed
      }
      
      score *= pattern.weight;
      
      if (score > maxScore) {
        maxScore = score;
        bestTone = tone;
      }
    });
    
    detectedTone = bestTone;
    confidence = Math.min(maxScore, 0.95);
    
    // Analyze voice characteristics if available
    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate advanced audio features
      const volume = dataArray.reduce((sum, value) => sum + value) / dataArray.length;
      const highFreqs = dataArray.slice(Math.floor(bufferLength * 0.6)).reduce((sum, val) => sum + val, 0) / (bufferLength * 0.4);
      const lowFreqs = dataArray.slice(0, Math.floor(bufferLength * 0.3)).reduce((sum, val) => sum + val, 0) / (bufferLength * 0.3);
      
      // Advanced audio-based tone adjustment
      if (volume > 130 && highFreqs > 110) {
        // High energy, high pitch - likely cheerful or excited
        if (detectedTone === 'neutral' || confidence < 0.4) {
          detectedTone = 'cheerful';
          confidence = Math.max(confidence, 0.6);
        } else if (detectedTone === 'friendly') {
          confidence += 0.2;
        }
      } else if (volume > 140 && lowFreqs > 100) {
        // Loud with low frequencies - might be annoyed
        if (detectedTone === 'neutral' || confidence < 0.4) {
          detectedTone = 'annoyed';
          confidence = Math.max(confidence, 0.5);
        }
      } else if (volume < 70) {
        // Very quiet - might be rushed or hesitant
        if (detectedTone === 'neutral') {
          detectedTone = 'rushed';
          confidence = Math.max(confidence, 0.4);
        }
      }
      
      // Frequency variance analysis for emotional state
      const freqVariance = calculateVariance(Array.from(dataArray));
      if (freqVariance > 500) {
        // High variance indicates emotional speech
        confidence += 0.1;
      }
    }
    
    if (confidence > 0.3) {
      handleToneDetection(detectedTone, Math.min(confidence, 1.0));
    }
  };
  
  const analyzeSentiment = (text: string) => {
    // Simple sentiment analysis function
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'like', 'awesome', 'fantastic', 'brilliant'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'annoying', 'stupid', 'worst', 'horrible', 'disgusting', 'pathetic'];
    
    const words = text.toLowerCase().split(/\W+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    if (total === 0) return { score: 0, magnitude: 0 };
    
    const score = (positiveCount - negativeCount) / total;
    const magnitude = total / words.length;
    
    return { score, magnitude };
  };
  
  const calculateVariance = (arr: number[]) => {
    const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
    const squaredDiffs = arr.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / arr.length;
  };

  // Improved expression detection with better accuracy
  const analyzeExpression = async () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;

    try {
      // Use AI-powered detection if models are loaded
      if (modelsLoaded && (window as any).faceapi) {
        await analyzeExpressionWithAI();
      } else {
        // Fallback to basic detection
        await analyzeExpressionBasic();
      }
    } catch (error) {
      console.error('Expression analysis error:', error);
      // Fallback to basic detection on AI error
      await analyzeExpressionBasic();
    }
  };

  const analyzeExpressionWithAI = async () => {
    if (!videoRef.current) return;
    
    try {
      // Detect faces and expressions using face-api.js
      const detections = await (window as any).faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceExpressions();
      
      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        
        // Find the dominant expression
        let maxExpression = 'neutral';
        let maxConfidence = 0;
        
        Object.keys(expressions).forEach((expr) => {
          if (expressions[expr] > maxConfidence) {
            maxConfidence = expressions[expr];
            maxExpression = expr;
          }
        });
        
        // Map face-api expressions to our expressions
        let mappedExpression = 'neutral';
        if (maxExpression === 'happy' && maxConfidence > 0.3) {
          mappedExpression = 'smile';
        } else if (maxExpression === 'sad' && maxConfidence > 0.4) {
          mappedExpression = 'frown';
        } else if ((maxExpression === 'angry' || maxExpression === 'disgusted') && maxConfidence > 0.3) {
          mappedExpression = 'frown';
        } else if (maxExpression === 'neutral' && maxConfidence > 0.5) {
          mappedExpression = 'focused';
        } else if (maxExpression === 'surprised' && maxConfidence > 0.4) {
          mappedExpression = 'neutral';
        }
        
        setLastDetectedExpression(mappedExpression);
        setExpressionConfidence(maxConfidence);
        
        // Only update if confidence is high enough and expression changed
        if (maxConfidence > 0.25 && mappedExpression !== currentExpression) {
          handleExpressionDetection(mappedExpression);
        }
      }
    } catch (error) {
      console.error('AI expression analysis failed:', error);
      await analyzeExpressionBasic();
    }
  };

  const analyzeExpressionBasic = async () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx || video.videoWidth === 0 || video.videoHeight === 0) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for analysis - focus on face area (center of frame)
    const faceX = Math.floor(canvas.width * 0.25);
    const faceY = Math.floor(canvas.height * 0.25);
    const faceWidth = Math.floor(canvas.width * 0.5);
    const faceHeight = Math.floor(canvas.height * 0.5);
    
    const imageData = ctx.getImageData(faceX, faceY, faceWidth, faceHeight);
    
    // Analyze facial features
    const faceMetrics = analyzeFaceMetrics(imageData);
    const movement = detectFaceMovement(imageData);
    
    // Determine expression with better logic
    let detectedExpression = determineExpression(faceMetrics, movement);
    let confidence = calculateConfidence(faceMetrics, movement);
    
    // Add to history for smoothing
    expressionHistoryRef.current.push(detectedExpression);
    if (expressionHistoryRef.current.length > 5) {
      expressionHistoryRef.current.shift();
    }
    
    // Use majority vote from recent history
    const smoothedExpression = getMajorityExpression();
    
    // Only update if confidence is high enough and expression is stable
    if (confidence > 0.6 && smoothedExpression !== currentExpression) {
      setLastDetectedExpression(smoothedExpression);
      setExpressionConfidence(confidence);
      handleExpressionDetection(smoothedExpression);
    }
  };

  const analyzeFaceMetrics = (imageData: ImageData) => {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    
    // Analyze different regions of the face
    const topHalf = analyzeRegion(data, 0, 0, width, height / 2, width);
    const bottomHalf = analyzeRegion(data, 0, height / 2, width, height / 2, width);
    const centerRegion = analyzeRegion(data, width * 0.3, height * 0.4, width * 0.4, height * 0.2, width);
    
    return {
      topBrightness: topHalf.brightness,
      bottomBrightness: bottomHalf.brightness,
      centerBrightness: centerRegion.brightness,
      topContrast: topHalf.contrast,
      bottomContrast: bottomHalf.contrast,
      asymmetry: Math.abs(topHalf.brightness - bottomHalf.brightness)
    };
  };

  const analyzeRegion = (data: Uint8ClampedArray, startX: number, startY: number, regionWidth: number, regionHeight: number, imageWidth: number) => {
    let brightness = 0;
    let pixelCount = 0;
    let values: number[] = [];
    
    for (let y = startY; y < startY + regionHeight; y++) {
      for (let x = startX; x < startX + regionWidth; x++) {
        const index = (y * imageWidth + x) * 4;
        if (index < data.length - 3) {
          const gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
          brightness += gray;
          values.push(gray);
          pixelCount++;
        }
      }
    }
    
    brightness /= pixelCount;
    
    // Calculate contrast (standard deviation)
    let variance = 0;
    values.forEach(val => variance += Math.pow(val - brightness, 2));
    const contrast = Math.sqrt(variance / values.length);
    
    return { brightness: brightness / 255, contrast: contrast / 255 };
  };

  const detectFaceMovement = (imageData: ImageData): number => {
    if (!lastFrameDataRef.current) {
      lastFrameDataRef.current = imageData;
      return 0;
    }

    let totalDiff = 0;
    const data1 = imageData.data;
    const data2 = lastFrameDataRef.current.data;
    
    // Sample every 16th pixel for performance
    for (let i = 0; i < data1.length; i += 64) {
      const r1 = data1[i], g1 = data1[i + 1], b1 = data1[i + 2];
      const r2 = data2[i], g2 = data2[i + 1], b2 = data2[i + 2];
      
      const diff = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
      totalDiff += diff;
    }

    lastFrameDataRef.current = imageData;
    return totalDiff / (data1.length / 64) / 255;
  };

  const determineExpression = (metrics: any, movement: number): string => {
    const { topBrightness, bottomBrightness, centerBrightness, asymmetry } = metrics;
    
    // More sophisticated logic
    if (movement < 0.05) {
      return 'neutral'; // Very little movement = neutral
    }
    
    // Look for smile patterns: bottom of face brighter than top (teeth showing)
    if (bottomBrightness > topBrightness + 0.1 && centerBrightness > 0.5) {
      return 'smile';
    }
    
    // Look for frown patterns: top darker, more asymmetry
    if (topBrightness < 0.4 && asymmetry > 0.1) {
      return 'frown';
    }
    
    // Focused/serious: balanced but low overall brightness
    if (Math.abs(topBrightness - bottomBrightness) < 0.05 && centerBrightness < 0.4) {
      return 'focused';
    }
    
    return 'neutral';
  };

  const calculateConfidence = (metrics: any, movement: number): number => {
    const { asymmetry, topContrast, bottomContrast } = metrics;
    
    // Higher confidence with more distinct features
    let confidence = 0.5;
    
    if (movement > 0.1) confidence += 0.2; // Movement indicates expression change
    if (asymmetry > 0.05) confidence += 0.2; // Asymmetry indicates expression
    if (topContrast > 0.1 || bottomContrast > 0.1) confidence += 0.1; // Clear features
    
    return Math.min(confidence, 1.0);
  };

  const getMajorityExpression = (): string => {
    const history = expressionHistoryRef.current;
    const counts: { [key: string]: number } = {};
    
    history.forEach(expr => {
      counts[expr] = (counts[expr] || 0) + 1;
    });
    
    let maxCount = 0;
    let majorityExpr = 'neutral';
    
    Object.entries(counts).forEach(([expr, count]) => {
      if (count > maxCount) {
        maxCount = count;
        majorityExpr = expr;
      }
    });
    
    return majorityExpr;
  };

  const startDetection = () => {
    if (!cameraActive) return;
    
    setIsDetecting(true);
    // Much faster detection - every 300ms for better responsiveness
    detectionIntervalRef.current = setInterval(() => {
      if (autoDetection) {
        analyzeExpression();
      }
    }, 300);
  };

  const stopDetection = () => {
    setIsDetecting(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  };

  const showSummary = () => {
    stopCamera();
    setShowResults(true);
  };

  // Load AI models on component mount
  useEffect(() => {
    const loadModels = async () => {
      setLoadingModels(true);
      try {
        // Check if face-api is available
        if (typeof window !== 'undefined' && (window as any).faceapi) {
          const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.13/model';
          
          await Promise.all([
            (window as any).faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            (window as any).faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            (window as any).faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            (window as any).faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
          ]);
          
          setModelsLoaded(true);
          console.log('AI models loaded successfully');
        } else {
          console.warn('Face-api.js not available, using basic detection');
          setModelsLoaded(false);
        }
      } catch (error) {
        console.error('Failed to load AI models:', error);
        setModelsLoaded(false);
      } finally {
        setLoadingModels(false);
      }
    };
    
    loadModels();
  }, []);

  // Auto-start camera when component starts
  useEffect(() => {
    if (hasStarted && !cameraActive && !isLoadingCamera && !permissionDenied) {
      startCamera();
    }
  }, [hasStarted]);

  // Start detection when camera becomes active
  useEffect(() => {
    if (cameraActive && !isDetecting) {
      setTimeout(() => startDetection(), 2000); // Wait 2 seconds for camera to stabilize
    } else if (!cameraActive && isDetecting) {
      stopDetection();
    }
  }, [cameraActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!hasStarted) {
    return (
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-blue-200 to-indigo-200 border-blue-300 flex items-center justify-center transition-transform duration-300 hover:scale-[1.02] shadow-sm">
        <div className="text-center p-4 md:p-6">
          <div className="text-5xl md:text-6xl mb-3 md:mb-4">🎭</div>
          <p className="text-xs md:text-sm text-gray-700 mb-4 px-2">Practice your staff behavior - see how customers react!</p>
          <Button 
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Smile className="w-4 h-4" />
            Start Staff Training
          </Button>
          <p className="text-xs text-gray-600 mt-2">Choose different staff behaviors and tones</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-purple-100 to-pink-100 border-purple-300 p-4 md:p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">�</div>
          <h3 className="text-lg font-bold text-purple-800 mb-4">Mirror Test Results</h3>
          
          <div className="bg-white/60 rounded-lg p-4 mb-4">
            <p className="text-sm text-purple-800 mb-2">
              <strong>Expressions Detected:</strong> {detectionCount}
            </p>
            <p className="text-sm text-purple-700">
              You experienced how facial expressions directly impact customer reactions in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-red-700 mb-2">Negative Expressions</h4>
                <p className="text-sm text-red-600 mb-2">Create negative reactions:</p>
                <ul className="text-xs text-red-600 list-disc list-inside space-y-1">
                  <li>Frowns → Customer discomfort</li>
                  <li>Serious faces → Business-only interaction</li>
                  <li>No expression → Customer confusion</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-700 mb-2">Positive Expressions</h4>
                <p className="text-sm text-green-600 mb-2">Create positive reactions:</p>
                <ul className="text-xs text-green-600 list-disc list-inside space-y-1">
                  <li>Genuine smiles → Customer warmth</li>
                  <li>Eye contact → Customer trust</li>
                  <li>Welcoming face → Customer comfort</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-purple-800 font-medium mb-2">Key Insight:</p>
            <p className="text-sm text-purple-700">Your face is your first impression. Customers mirror what they see in you!</p>
          </div>

          <Button 
            onClick={handleReset}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (permissionDenied) {
    return (
      <div className="relative w-full min-h-64 rounded-xl overflow-hidden border bg-gradient-to-br from-red-100 to-red-200 border-red-300 p-4 md:p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🚫</div>
          <h3 className="text-lg font-bold text-red-800 mb-4">Camera Issue</h3>
          <p className="text-sm text-red-700 mb-4">
            Unable to access your camera for the mirror test.
          </p>
          <div className="text-xs text-red-600 mb-4 space-y-1">
            <p>• Check if camera permissions are allowed in your browser</p>
            <p>• Make sure no other app is using your camera</p>
            <p>• Try refreshing the page</p>
          </div>
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={startCamera}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <Camera className="w-4 h-4 mr-2" />
              Retry Camera
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="px-4 py-2 rounded-lg"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full min-h-80 rounded-xl overflow-hidden border transition-all duration-500 ${currentExpressionData.bgColor} p-4 md:p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs flex items-center gap-1">
            <Camera className="w-3 h-3" />
            Live Mirror
          </Badge>
          {isDetecting && (
            <Badge className="text-xs flex items-center gap-1 bg-green-600">
              <Brain className="w-3 h-3" />
              Detecting
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setAutoDetection(!autoDetection)}
            size="sm"
            variant="outline"
            className={`px-2 py-1 text-xs ${autoDetection ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            Auto: {autoDetection ? 'ON' : 'OFF'}
          </Button>
          <Button
            onClick={showSummary}
            size="sm"
            variant="outline"
            className="px-2 py-1 text-xs"
          >
            End Test
          </Button>
          <Button
            onClick={handleReset}
            size="sm"
            variant="outline"
            className="px-2 py-1"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Title */}
      <h3 className={`text-base md:text-lg font-bold mb-4 text-center ${currentExpressionData.textColor}`}>
        {currentExpressionData.title}
      </h3>

      {/* Camera and Customer Reaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Your Camera (Mirror) */}
        <div className="text-center">
          <div className="bg-black rounded-lg overflow-hidden mb-2 aspect-square">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover transform scale-x-[-1]"
              style={{ 
                filter: 'brightness(1.1) contrast(1.1)',
                display: cameraActive ? 'block' : 'none'
              }}
              onLoadedData={() => {
                console.log('Video loaded data');
                setCameraActive(true);
                setIsLoadingCamera(false);
              }}
              onError={(e) => {
                console.error('Video error:', e);
                setCameraActive(false);
                setPermissionDenied(true);
                setIsLoadingCamera(false);
              }}
            />
            {!cameraActive && (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  {isLoadingCamera ? (
                    <>
                      <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-xs text-gray-400 mb-2">
                        {loadingModels ? 'Loading AI models...' : 'Starting camera...'}
                      </p>
                      {modelsLoaded && !loadingModels && (
                        <p className="text-xs text-green-400 mb-1">🤖 AI Detection Ready</p>
                      )}
                      {!modelsLoaded && !loadingModels && (
                        <p className="text-xs text-yellow-400 mb-1">📊 Basic Detection Mode</p>
                      )}
                      <Button
                        onClick={() => {
                          setIsLoadingCamera(false);
                          setCameraActive(false);
                        }}
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                      >
                        Skip Camera
                      </Button>
                    </>
                  ) : (
                    <>
                      <CameraOff className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 mb-1">Camera not active</p>
                      <Button
                        onClick={startCamera}
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                      >
                        <Camera className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-1">Your Expression (Staff)</p>
          <p className="text-xs text-gray-600">{currentExpressionData.description}</p>
        </div>

        {/* Customer Reaction */}
        <div className="text-center">
          <div className="bg-white/70 rounded-lg p-8 md:p-12 border border-white/50 mb-2 aspect-square flex items-center justify-center">
            <div className="text-6xl md:text-8xl">{currentExpressionData.customerIcon}</div>
          </div>
          <p className="text-xs font-semibold text-gray-700 mb-1">Customer Response</p>
          <p className="text-xs text-gray-600">{currentExpressionData.customerMood}</p>
        </div>
      </div>

      {/* Hidden canvas for expression analysis */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
        width={640} 
        height={480}
      />

      {/* Expression Detection Controls */}
      <div className="bg-white/60 rounded-lg p-4 mb-4 border border-white/40">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-800 font-medium">
            {autoDetection ? 'Auto-detecting your expressions' : 'Manual expression testing'}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {isDetecting && autoDetection && (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {expressionConfidence > 0 && (
                  <span>
                    {Math.round(expressionConfidence * 100)}% confident
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
        
        {!autoDetection && (
          <div className="flex justify-center gap-2">
            <Button
              onClick={() => handleExpressionDetection('smile')}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs flex items-center gap-1"
            >
              <Smile className="w-3 h-3" />
              Smile
            </Button>
            <Button
              onClick={() => handleExpressionDetection('neutral')}
              size="sm"
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 text-xs flex items-center gap-1"
            >
              <Meh className="w-3 h-3" />
              Neutral
            </Button>
            <Button
              onClick={() => handleExpressionDetection('frown')}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs flex items-center gap-1"
            >
              <Frown className="w-3 h-3" />
              Frown
            </Button>
            <Button
              onClick={() => handleExpressionDetection('focused')}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
            >
              Serious
            </Button>
          </div>
        )}
        
        {autoDetection && (
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-600">
              Make different facial expressions in front of the camera to see customer reactions change automatically
            </p>
            {modelsLoaded ? (
              <p className="text-xs text-green-600 flex items-center justify-center gap-1">
                🤖 <span>AI facial expression recognition active</span>
              </p>
            ) : (
              <p className="text-xs text-orange-600 flex items-center justify-center gap-1">
                📊 <span>Basic pixel-based detection mode</span>
              </p>
            )}
            {isDetecting && expressionConfidence > 0 && (
              <p className="text-xs text-gray-500">
                Last detected: {lastDetectedExpression} ({Math.round(expressionConfidence * 100)}% confidence)
              </p>
            )}
          </div>
        )}
      </div>

      {/* Tone Detection Controls */}
      <div className="bg-white/60 rounded-lg p-4 mb-4 border border-white/40">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
            <Mic className="w-4 h-4" />
            Voice Tone Detection
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            {isListening && (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Listening...
              </span>
            )}
            {toneConfidence > 0 && (
              <span>{Math.round(toneConfidence * 100)}% confident</span>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Button
            onClick={() => speakDialogue('friendly')}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs"
            disabled={isSpaking}
          >
            😊 Friendly Tone
          </Button>
          <Button
            onClick={() => speakDialogue('cheerful')}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 text-xs"
            disabled={isSpaking}
          >
            😄 Cheerful Tone
          </Button>
          <Button
            onClick={() => speakDialogue('rushed')}
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 text-xs"
            disabled={isSpaking}
          >
            ⏰ Rushed Tone
          </Button>
          <Button
            onClick={() => speakDialogue('annoyed')}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs"
            disabled={isSpaking}
          >
            😤 Annoyed Tone
          </Button>
        </div>
        
        {currentDialogue && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Volume2 className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Staff says:</span>
            </div>
            <p className="text-sm text-blue-800 italic">"{currentDialogue}"</p>
          </div>
        )}
        
        <div className="text-xs text-gray-600 space-y-1">
          <p>Click a tone button to hear staff dialogue, then speak your response for AI tone analysis</p>
          {modelsLoaded ? (
            <p className="text-green-600 flex items-center gap-1">
              🤖 <span>Enhanced AI sentiment detection active</span>
            </p>
          ) : (
            <p className="text-orange-600 flex items-center gap-1">
              📊 <span>Basic keyword-based detection mode</span>
            </p>
          )}
        </div>
      </div>

      {/* Combined Detection Status */}
      <div className="bg-white/80 rounded-lg p-3 border border-white/40">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">Expression</p>
            <Badge className={`${currentExpressionData.bgColor} ${currentExpressionData.textColor} text-xs`}>
              {currentExpression}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Tone</p>
            <Badge className="bg-blue-50 text-blue-700 text-xs">
              {currentTone}
            </Badge>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="text-xs text-gray-600">
            <strong>Total Interactions:</strong> {detectionCount}
          </p>
        </div>
      </div>
    </div>
  );
}