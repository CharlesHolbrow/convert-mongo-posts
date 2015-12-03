---
publish: true
date: '2013-06-22 14:10:19'
edited: '2013-07-18 21:01:17'
title: WebRTC Concepts
tags: [webrtc, javascript]
---
                     
WebRTC is pretty tricky to work with right now. As of June 2013, 
support in Chrome and Firefox Nightly is fragmented and incomplete. 
The best explanation of WebRTC that I have found is the 
[WebRTC Spec Draft from the W3C](http://www.w3.org/TR/webrtc/).
This pedantic document is filled with jargon specific to Internet Connectivity 
Establishment. To elucidate the spec, I put together a list of descriptions 
for the most fundamental concepts.

Proceed with Caution! Both Chrome and Firefox are still a long way 
from compliance. 

**ICE** - Protocol for Network Address Translation -
[Interactive Connectivity Establishment (ICE): A Protocol for Network Address Translator (NAT) Traversal for Offer/Answer Protocols](http://www.ietf.org/rfc/rfc5245.txt).
ICE agents include STUN and TURN servers.

**STUN** - Session Traversal Utilities for NAT (STUN).
Peers connect to a stun server to find their public facing 
addresses, AND other info on how that peer may be reached fron the 
internet.

**TURN** - Traversal Using Relays around NAT (TURN). Like a
stun server, but can relay data from one peer to another if the
clients are unable to connect directly. Every TURN server is
also a STUN server.

**NAT** - Network Address Translation - When a signal passes
through a router, the router may alter the port number --
effectively creating a "public facing address". The public address is 
effectively  mapped to a different address behing the router. 

**SDP** - Session Description Protocol -
[Wikipedia](http://en.wikipedia.org/wiki/Session_Description_Protocol)
- a format for describing streaming media initialization and connectivity 
parameters. 

An SDP example from someRTCPeerConnection.localDescription.sdp looks 
like this:

    v=0
    o=Mozilla-SIPUA-24.0a1 15165 0 IN IP4 0.0.0.0
    s=SIP Call
    t=0 0
    a=ice-ufrag:1f8009b2
    a=ice-pwd:04f106d867cbba054729ae220b5c9618
    a=fingerprint:sha-256 62:5F:18:CD:23:D3:BD:D9:C9:B4:42:BD:3B:07:2A:6A:EE:B0:06:59:6D:A3:B3:C8:E4:FA:99:B3:37:5E:56:FA
    m=audio 41438 RTP/SAVPF 109 0 8 101
    c=IN IP4 199.87.82.66
    a=rtpmap:109 opus/48000/2
    a=ptime:20
    a=rtpmap:0 PCMU/8000
    a=rtpmap:8 PCMA/8000
    a=rtpmap:101 telephone-event/8000
    a=fmtp:101 0-15
    a=sendrecv
    a=candidate:0 1 UDP 2113667327 10.0.1.46 65468 typ host
    a=candidate:1 1 UDP 1694302207 199.87.82.66 41438 typ srflx raddr 10.0.1.46 rport 65468
    a=candidate:0 2 UDP 2113667326 10.0.1.46 57425 typ host
    a=candidate:1 2 UDP 1694302206 199.87.82.66 38208 typ srflx raddr 10.0.1.46 rport 57425
    m=application 37652 SCTP/DTLS 5000
    c=IN IP4 199.87.82.66
    a=fmtp:5000 protocol=webrtc-datachannel;streams=16
    a=sendrecv
    a=candidate:0 1 UDP 2113667327 10.0.1.46 55401 typ host
    a=candidate:1 1 UDP 1694302207 199.87.82.66 37652 typ srflx raddr 10.0.1.46 rport 55401
    a=candidate:0 2 UDP 2113667326 10.0.1.46 61947 typ host
    a=candidate:1 2 UDP 1694302206 199.87.82.66 46592 typ srflx raddr 10.0.1.46 rport 61947

**ICE Agent** - A peer trying to connect to another peer via ICE. I have 
also heard this term used to describe an arbitrary node in the Internet 
Connectivity Establishment Handshake. 

The following definitions borrow from the [IETF ICE Spec](http://www.ietf.org/rfc/rfc5245.txt)

**ICE Peer** - From the perspective of one of the agents in a session, 
its peer is the other agent.  Specifically, from the perspective of the 
offerer, the peer is the answerer.  From the perspective of the 
answerer, the peer is the offerer.

**ICE Transport Address** - The combination of an IP address, port and transport
protocol (such as UDP or TCP) port.

**ICE Candidate** -  A transport address that is a potential
point of contact for receipt of media.  An agent may have many
candidate addresses -- each consisting of an IP address and 
port number. Candidates might include:

- A transport address on a directly attached network interface (a "host" address)
- A translated transport address on the public side of a NAT (a "server reflexive" address)
- A transport address allocated from a TURN server (a "relayed" address)

Candidates have properties -- their type (server reflexive, relayed 
or host), priority, foundation, and base.

**ICE Component** - A component is a piece of a media stream requiring a
single transport address; a media stream may require multiple
components, each of which has to work for the media stream as a
whole to work.  For media streams based on RTP, there are two
components per media stream -- one for RTP, and one for RTCP.


Helpful WebRTC Resources
----------------------

[Mozilla Hacks blog post mentions some of the discrepancies between chrome and Firefox](https://hacks.mozilla.org/2013/05/embedding-webrtc-video-chat-right-into-your-website/)  
[Webrtc on Chrome for Beginners](https://webrtc-experiment.appspot.com/docs/rtc-datachannel-for-beginners.html)  
[General Description on IETF](http://datatracker.ietf.org/doc/draft-ietf-rtcweb-jsep/?include_text=1)  
[WebRTC Spec Draft from the W3C](http://www.w3.org/TR/webrtc/)  
[Peer.js -- This WebRTC abstraction library worked really well for me](http://www.peerjs.com)  
