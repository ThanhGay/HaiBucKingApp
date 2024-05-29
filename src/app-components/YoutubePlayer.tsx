import { useState } from "react";
import { View } from "react-native";
import YouTube from "react-native-youtube";

function YoutubePlayer() {

    const [isReady, setIsReady] = useState(false)
    const [status, setStatus] = useState(null)
    const [quality, setQuality] = useState(null)
    const [error, setError] = useState(null)

    return (
      <View style={{ flex: 1 }}>
        <YouTube
          apiKey="AIzaSyD6FWgl-E8Cglt_J0DH3-TDSfxhNpaZiy0"
          videoId="qn1t_biQigc?si=kFxzx1PYuGJB4NcH"
          play
          fullscreen
          loop
          onReady={e => setIsReady(true)}
        //   onChangeState={(e: any) => setStatus(e.state))}
        //   onChangeQuality={(e) => setQuality(e.quality)}
          onError={(e) => setError(e.error)}
          style={{ alignSelf: 'center', height: 300 }}
        />
      </View>
    );
}

export default YoutubePlayer;