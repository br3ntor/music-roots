# Random Roots Clone

## How it works

## The Note Slide Animation

The approach I took to cycle the notes is to have a total of 5 notes, with 3 on screen and 2 offscreen.
The note on the right side, off the screen, can update to a new note.
The note to the left of the middle can animate off the screen to the left position.

## The App Page(Container) and the Settings Page(Container)

Both the MusicBox and Settings pages/containers are rendered at the same time and then I use
styling to switch between them. I think the main reason I did this instead of having react edit the dom
is because I was experiencing latency on the button rendering? Something to keep in mind.

And thinking about it, I think it is very un-Reacty. 🤔

Realizing now that I think I needed to do this for the play pause button, but I don't think I need to for the settings page hmmm.
