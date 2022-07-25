OK, so there's something I'm not getting.  I can't get Xcode to build with either of the react native time pickers out there.  The big problem for me is not being able to instal Xcode 11.6.  That would mean installed Catalina, which would break all kinds of shit.  Going back 2 major versions of a package doesn't seem to help.

For datetimepicker I went back to the very 1st version!!  This builds...

So I'm gonna try this guys picker (which he shows how he made):
https://www.youtube.com/watch?v=PVSjPswRn0U
https://github.com/wcandillon/can-it-be-done-in-react-native/tree/master/the-10-min/src/Picker

This is another one (old enough to not be an issue):
https://github.com/nysamnang/react-native-24h-timepicker

One has to wonder if I'd be better creating an image of Catalina or what have you, installed VS Code in there etc, but that would take TIME.  Took me a long time to get to here!!

----------------

Convert the Context 1st

* TODO: Does react-mobile-picker actually work in React Native?  Cause I use "Picker"

* **Divs** become views.
* What's the co-relation for **header** tag?  A view?
* **Href** shouldn't be a Href anyways, it should be a button
* What's an input tag?  **TextInput** (GPT has one)

* Move the CSS **styles** into RN styles (one by one).


TODO: If needed, maybe there's an easy ios spindle, as that's what it's based on anwyays.  React Native has a Picker:
https://reactnative.dev/docs/picker
But this is in the style I want:
https://github.com/react-native-picker/picker

You're on RN 0.63.0.  to use this you need to install the cocoa pod:
npx pod-install

This also looks good?
react-native-datetimepicker
https://morioh.com/p/3c9e95e24195
https://github.com/mmazzarolo/react-native-modal-datetime-picker

I feel a **POC** coming on!!  I'm creating TimePickerReactNative

This is to solve
https://developer.apple.com/forums/thread/64973

You have to run pod install.  There's also a flutter thing that you have to comment out (or whatever)



