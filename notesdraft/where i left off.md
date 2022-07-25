Feb 08:  Remember to run the **"start" script 1st**, then the ios verson,so two tabs in VS Code running.

Gonna get rid of the slider now and then see how difficult creating the **TimePicker in React Native** would be.

----------------
This works but obviously isn't finished yet. I have the idea of the Power button approach still and heading in the Smart Home direction. Currently it just looks like a player, which it basically IS, but I don't want to look like that, more like Smart Home.

Which of course means setting up a timer to go off after say 15 minutes or whatnot. Meaning they should have the same spindle slider to specify that time, with a Confirm button or Cancel button etc. When the timer's up call TrackPlayer.stop().

For reference:
Vid 1 (UI):
https://www.youtube.com/watch?v=fOtCxD3AodY
Vid 2 (functionality):
https://www.youtube.com/watch?v=-F8twDee9rA

Notes:

- You need that dummy.swift file in the ios directory. This is outlined in the react native track player area.
- The "notification capabilities" bits are Android only (ios doesn't have them), but this version of react native track player doesn't have them. For this reason, try upgrading to 2.1.0. In Android you can test it as he does at the end of his second video.
- There's something wrong with the "progress max" it changes as you move the slider so whatever that is or the max area is not quite right. Look at either his or the react native track player example code in Github. UPDATE: I believe I just fixed this 💪🏼 there was missing brackets around the progress max label.
- Bear in mind all of his **code is gotten from** the react native track player official example in Github. There are only slight differences. So use that as a reference if needed, cause his stuff isn't in Guthub (presumably that's why)
- **Check-in** Check in the basic "create react app" base first, then supporting files(mp3s, artwork), then the main files.
- The **file lengths**: I need to find the loop I'm using (assuming I am) and create a shorter file that repeats, as this would reduce the size of the app. So look in Ableton for ways to do that.
- With shorter file lengths perhaps the **progress container makes no sense**. It's noise, it doesn't matter where you are in the file, so perhaps replacing the progress container and the play button with a **power button** would be awesome. I believe I have this in an app somewhere? the icons needed etc. Play would be fine, but it moves away from a player, which might seems limited given how many songs there are in the world. Turn on, turn off, change style, that works methinks.
- I left out the **changing background color**, but I do like that. Perhaps merging the two GUIS colors etc makes sense?
- On the Android emulator, how does one change the **audio interface**? ios emulator has tons of options including this (Audio Output) which are needed as you would expect, but how does Android do it? In Android Studio? Cause otherwise I can't hear any sound in Android.

## Earlier notes (just for reference)

I can't get ios to work, it's claiming the **Xcode project** is for a newer version, so presumably whatever created that, determined it should be a newer version created, but I have no idea how/why that happens or how to fix it. Also **Watchman** install was taking hours and maxing out the machine. **XCode 12** requires newer OS (Catalina). 12 is likely preferred, but fuck that.

However **Android DOES work**, so just use that.

I think **Metro** has to be running:
npx react-native start

and then I run in the **android dir**:
npx react-native run-android

Now **copy the code** from the vid into this project.

Note: I think creating an **Expo version** of this is a good idea at some point, as I'm not a huge fan of the Native CLI approach, lot of overhead I can't be bothered with. Expo/RN is plenty for now. I'm only doing this cause I'm assuming there might be differences. There might not be though, in which case I would go back to Expo stat.
