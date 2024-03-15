import React from "react";

import { Audio } from "expo-av";

import getSound from "@/shared/resources/sounds";
import Button from "@/shared/ui/button/button";

interface SoundLetterProps {
  id: string
}

const SoundLetter: React.FC<SoundLetterProps> = ({
  id
}) => {
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });


  const playSound = async (id: string) => {
    try {
      const sound = getSound(id);

      const { sound: playbackObject } = await Audio.Sound.createAsync(sound, {
        shouldPlay: true,
      });

      playbackObject.playAsync();
    } catch (error) {
      return error;
    }
  };

  return (
    <Button
      customStyles={{ flex: 1, marginTop: 0 }}
      title={"Sound"}
      onClick={() => playSound(id)}
      type={"inactive"}
      image={"volume-high"}
    />
  );
};

export default SoundLetter;