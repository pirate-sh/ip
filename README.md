
  Usage: pirateship [options] [command]


  Commands:

    default                                                   sets a raspbian back to default configuration
    rename <hostname>                                         changes Hostname
    adapter <wirelessSSID> <password> <wirelessSecurityType>  [deprecated] connects a adapter to a wifi network
    wifi <ESSID> [password]                                   connects to a wifi network
    ethernet <ip> <mask> <gateway> <dns>                      configures rpi network interface to a static ip address
    detectrpi                                                 detects the hardware version of a raspberry pi
    detectwifi                                                detect chipset of USB-Wifi dongle

  Options:

    -h, --help  output usage information
