# Raspberry Pi: Huygens Probe Titan Landing Video Kiosk

![Kiosk Screenshot](https://github.com/owntheweb/huygens-pi-kiosk/raw/master/img/preview.jpg)

Developed for the [Space Foundation Discovery Center](https://www.discoverspace.org), this touch screen kiosk features a full-screen video presentation of the [Huygens Probe](https://www.discoverspace.org/discover/el-pomar-space-gallery/huygens-probe) Titan landing on January 14, 2005.

![Credits](https://github.com/owntheweb/huygens-pi-kiosk/raw/master/img/credits.jpg)

The video was provided courtesy of Erich Karkoschka, University of Arizona, the DISR Team, NASA and ESA, converted for use in this kiosk project. Copyright 2016 University of Arizona. The video files have been included in this repository for your convenience, but are not included as part of the license of this project.

Designed for use with a Raspberry Pi and a touchscreen, the interface allows for playback, pause, skipping and rewinding of the video. Following the setup instructions below, the Pi will auto-launch the kiosk web page full-screen in Chromium once booted. No internet connection is required for this offline display once setup.

**NOTE:** This readme file is still a wok-in-progress. Post an issue if there are questions!

# Ingredients

- Raspberry Pi 2B or 3 (tested with a 3B)
- [Raspberry Pi Touch Display](https://www.raspberrypi.org/blog/the-eagerly-awaited-raspberry-pi-display/)
- 10 speed micro sd card
- Power supply

# Raspberry Pi Hardware Setup

See Raspberry Pi Touch Display instructions. [Here's a video tutorial](https://www.youtube.com/watch?v=tK-w-wDvRTg).

# Install Raspbian

Download Raspbian (lite version) .zip at https://www.raspberrypi.org/downloads/ and unzip.

Insert the disk that will be used the Pi. Burn the downloaded image with [Etcher](https://etcher.io/), an app that makes burning images to disk simple.

# Configure Raspbian

Configure the Pi with raspi-config

Open the Terminal, then:

`sudo raspi-config`

It's important to change the password for security purposes. Choose "1 Change User Password", then "<Ok>", then follow the prompts.

Move to the advanced options screen. Choose "2 Networking Options".

Change the hostname to something other than raspberrypi if connecting to the network (your IT team will thank you). Choose "N1 Hostname", then enter a new name that describes this Pi e.g. "huygens-probe-kiosk".

Force audio to use the headphone jack as the Huygens probe landing video has great sound. Choose "A9 Audio", then "1 Force 3.5mm ('headphone') jack". Select "<Ok>".

Add more memory to GPU by choosing "7 Advanced Options", then "A3 Memory Split". Revise 64 to 160 then choose "OK".

Go back to the main screen and select "<Finish>", then choose "<Yes>" to reboot.

# Transfer Kiosk Files To the Pi (needs tested)

Ensure the Pi is plugged into an internet-connected ethernet cable.

Install Git to clone this repository to the Pi:

`sudo apt-get install git`

Clone the repository:

```
cd ~/
git clone https://github.com/owntheweb/huygens-pi-kiosk.git
```

# Auto-Launch Huygens Kiosk Once Booted

Make the kiosk hassle free by auto-launching Chromium full-screen in kiosk mode after the Pi has booted.

As CSS and JavaScript will NOT hide the mouse in chromium browser. Here's a work-around to be included with boot options further down:

`sudo apt-get install unclutter`

In the Pi terminal, open the autostart options file for edits:

`sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart`

Delete or comment out all lines shown, then add:

```
#@xscreensaver -no-splash #remove the starting "#" if you wish this kiosk to start a screensaver if not interacted with for a while
@xset s off
@xset -dpms
@xset s noblank
@unclutter -idle 0.1
@chromium-browser --incognito --kiosk file:///home/pi/huygens-pi-kiosk/index.html
```

Type Ctrl+X to close and hit return to save.

Reboot to see the results:

`sudo reboot`

The first time chromium browser launches, a popup will show regarding DuckDuckGo. Press anywhere to close the message. The second time chromium browser launches, it will ask to become the default. That's ok, and you should not run into this again.

# Recovery Plan

After confirming all works well, make a backup of the Pi image for faster recovery if the disk becomes corrupt (a common eventuality, especially without a safe shutdown).

Remove the disk from the Pi and insert to a computer (Mac in this case).

Find the inserted disk (see top instructions for details in identifying):

`diskutil list`

Unmount the disk (disk2 in this example):

`diskutil unmountDisk /dev/disk2`

Save a local image of the disk:

`sudo dd if=/dev/rdisk2 of=~/Desktop/huygensProbeKiosk.dmg bs=4m`

Enter your desktop login password if prompted for it.

Wait for a while. Go for a walk. When finished, save the .img file where it can be found again months later.

After all is complete, eject the "boot" drive in Mac OS, take out the SD card. Use Etcher to install to a card as needed.

# OPTIONAL: Enable USB Audio

The Space Foundation's version of this kiosk uses a [small USB speaker from Adafruit](https://www.adafruit.com/product/3369), allowing it to be powered by the Pi. To enable audio output via USB, follow [Adafruit's instructions here](https://learn.adafruit.com/usb-audio-cards-with-a-raspberry-pi/updating-alsa-config).

# OPTIONAL: Hide low power warnings if screen and Pi are sharing power

I'm /boot/config.txt, add this line:

`avoid_warnings=1`

# OPTIONAL: Install Safe Shutdown Switch

The Space Foundation's version of this kiosk uses a [shutdown switch with rocker](https://www.mausberrycircuits.com/collections/frontpage/products/shutdown-switch-with-rocker). [Follow install instructions here](https://www.mausberrycircuits.com/pages/setup).

# Special Thanks

Special thanks goes to the [Space Foundation](https://www.spacefoundation.org) and the [Space Foundation Education](https://www.discoverspace.org) team. Required hardware was provided for the development of this kiosk, along with a new team volunteer benefit that allows Space Foundation team members to allot monthly volunteer time towards a non-profit of choice (in this case same non-profit, education department).
