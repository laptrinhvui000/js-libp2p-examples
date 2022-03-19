// Libp2p Core
import Libp2p from 'libp2p'
// Transports
import Websockets from 'libp2p-websockets'
import filters from 'libp2p-websockets/src/filters'
import WebrtcStar from 'libp2p-webrtc-star'
// Stream Muxer
import Mplex from 'libp2p-mplex'
// Connection Encryption
import { NOISE } from 'libp2p-noise'
// Peer Discovery
import Bootstrap from 'libp2p-bootstrap'
import KadDHT from 'libp2p-kad-dht'
// Gossipsub
import Gossipsub from 'libp2p-gossipsub'

const transportKey = Websockets.prototype[Symbol.toStringTag]

const createLibp2p = async (peerId) => {
  // Create the Node
  const libp2p = await Libp2p.create({
    peerId,
    addresses: {
      listen: [
        '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
      ]
    },
    modules: {
      transport: [Websockets, WebrtcStar],
      streamMuxer: [Mplex],
      connEncryption: [NOISE],
      peerDiscovery: [Bootstrap],
      dht: KadDHT,
      pubsub: Gossipsub
    },
    config: {
      peerDiscovery: {
        [Bootstrap.tag]: {
          enabled: true,
          list: [
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
          ]
        }
      },
      // dht: {
      //   enabled: true,
      //   randomWalk: {
      //     enabled: true
      //   }
      // },
      // transport: {
      //   [transportKey]: {
      //     // by default websockets do not allow localhost dials
      //     // let's enable it for testing purposes in this example
      //     filter: filters.all
      //   }
      // }
    }
  })

  // Automatically start libp2p
  await libp2p.start()

  return libp2p
}

export default createLibp2p
