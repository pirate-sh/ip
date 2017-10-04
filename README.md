  Usage: node cli.js [options] [command]


  Commands:

    default                                                   sets a raspbian back to default configuration
    rename <hostname>                                         changes Hostname
    wifi <ESSID> [password]                                   connects to a wifi network
    staticwifi <ip> <mask> <gateway> <dns>                    configures rpi wifi interface to a static ip address
    hotspot <ESSID> [password]				      turns the rpi into a mobile hotspot
    ethernet <ip> <mask> <gateway> <dns>                      configures rpi network interface to a static ip address
    expandfs                                                  expands the partition of the RPI image to the maximum of the SDcard
    detectrpi                                                 detects the hardware version of a raspberry pi
    *                                                         temporary catch all

  Options:

    -h, --help  output usage informatio)

  Installation:
    So far this program assumes you can somehow manage to download nodejs 8 and also the npm packages commander and underscore, which are required for this program to run properly. 
    
    1. Install node 8
       > curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
       > sudo apt-get install -y nodejs
    2. Clone this repo then cd into ip directory to install the npm packages
       > git clone https://github.com/snazzybunny/ip.git
       > cd ip
    3. Install npm packages called commander and underscore
       > sudo npm install

       or manually install each one    

       > sudo npm install commander
       > sudo npm install underscore
    4. Figure out hostname of rpi. Output should print raspberrypi by default.
       > hostname
    5. Test the program by changing hostname to ole.
       > sudo node cli.js rename ole
    6. Output should be like:
       > pi@raspberrypi:~/ip $ cat /etc/hostname
       > ole

  Additional Notes:

    wifi - ESSID is the SSID or the network name of your wireless network and password is the password 
           for the corresponding network.

    rename - The hostname is a label assigned to the RPI device for identification on a network and 
             is useful for communication amongst different devices. The default hostname is raspberrypi.

    ethernet and staticwifi - before using these command, I checked that my network follows the ip range from 
                         192.168.0.1 to 192.168.0.254. To change my ip address to 192.168.0.251, I can 
                         issue the command below given that my router is found at 192.168.0.1 and 
                         that it is also a dns server. Alternatively, you can use Google's dns server, 
                         which is 8.8.8.8 or 8.8.4.4.  
                           > ethernet 192.168.0.251 255.255.255.0 192.168.0.1 192.168.0.1 
    hotspot - requires the packages hostapd dnsmasq. Do a sudo apt install hostapd dnsmasq to install them.
