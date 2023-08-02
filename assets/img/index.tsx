import { useAssets, Asset } from "expo-asset";
import { useEffect, useMemo, useState } from "react";
import Icons from "../../src/controller/backend/Icons";
import { Alert } from "react-native";

const useImageLoaderStatus = () => {
  const [isReady, setReady] = useState<boolean>(false);

  const [f0, ff0] = useAssets([
    require("./categories/00/Aim.png"),
    require("./categories/00/Airbnb.png"),
    require("./categories/00/Airtable.png"),
    require("./categories/00/Android.png"),
    require("./categories/00/Apple.png"),
    require("./categories/00/AppStore.png"),
    require("./categories/00/Asana.png"),
    require("./categories/00/Atlassian.png"),
    require("./categories/00/Basecamp.png"),
    require("./categories/00/Binance.png"),
    require("./categories/00/Bitcoin.png"),
    require("./categories/00/Bittorrent.png"),
    require("./categories/00/Buffer.png"),
    require("./categories/00/BuzzFeed.png"),
    require("./categories/00/Coinbase.png"),
    require("./categories/00/Confluence.png"),
    require("./categories/00/Coub.png"),
    require("./categories/00/Creativemarket.png"),
    require("./categories/00/Default.png"),
    require("./categories/00/Delicious.png"),
    require("./categories/00/Digg.png"),
    require("./categories/00/Drupal.png"),
    require("./categories/00/Edge.png"),
    require("./categories/00/Ethereum.png"),
    require("./categories/00/Evernote.png"),
    require("./categories/00/ExpressVPN.png"),
    require("./categories/00/Fancy.png"),
    require("./categories/00/Firefox.png"),
    require("./categories/00/Foursquare.png"),
    require("./categories/00/Gumroad.png"),
    require("./categories/00/Hola.png"),
    require("./categories/00/Iconfinder.png"),
    require("./categories/00/Iconjar.png"),
    require("./categories/00/Intercom.png"),
    require("./categories/00/Jira.png"),
    require("./categories/00/Kaixin001.png"),
    require("./categories/00/MailChimp.png"),
    require("./categories/00/Marvel.png"),
    require("./categories/00/MetaMask.png"),
    require("./categories/00/Mi.png"),
    require("./categories/00/Microsoft.png"),
    require("./categories/00/Miliao.png"),
    require("./categories/00/NordVPN.png"),
    require("./categories/00/Notion.png"),
    require("./categories/00/OK.png"),
    require("./categories/00/Opera.png"),
    require("./categories/00/Periscope.png"),
    require("./categories/00/ProductHunt.png"),
    require("./categories/00/QQ.png"),
    require("./categories/00/Renren.png"),
    require("./categories/00/Safari.png"),
    require("./categories/00/Shopify.png"),
    require("./categories/00/Shutterstock.png"),
    require("./categories/00/Sketch.png"),
    require("./categories/00/Skrill.png"),
    require("./categories/00/Strava.png"),
    require("./categories/00/StumbleUpon.png"),
    require("./categories/00/Taobao.png"),
    require("./categories/00/TeamViewer.png"),
    require("./categories/00/Tether.png"),
    require("./categories/00/Tilda.png"),
    require("./categories/00/Tor.png"),
    require("./categories/00/Treehouse.png"),
    require("./categories/00/Trello.png"),
    require("./categories/00/Tripadvisor.png"),
    require("./categories/00/Tux.png"),
    require("./categories/00/Ubuntu.png"),
    require("./categories/00/ui8.png"),
    require("./categories/00/Uplabs.png"),
    require("./categories/00/Utorrent.png"),
    require("./categories/00/Viadeo.png"),
    require("./categories/00/Vine.png"),
    require("./categories/00/Wickr.png"),
    require("./categories/00/Wikipedia.png"),
    require("./categories/00/Wire.png"),
    require("./categories/00/Yelp.png"),
    require("./categories/00/Zendesk.png"),
    require("./categories/00/Zerpply.png"),
  ]);

  const [f1, ff1] = useAssets([
    require("./categories/01/Lastfm.png"),
    require("./categories/01/MixCloud.png"),
    require("./categories/01/MySpace.png"),
    require("./categories/01/Shazam.png"),
    require("./categories/01/Soundcloud.png"),
    require("./categories/01/Spotify.png"),
    require("./categories/01/Tidal.png"),
    require("./categories/01/YoutubeMusic.png"),
  ]);

  const [f2, ff2] = useAssets([
    require("./categories/02/AdobeXD.png"),
    require("./categories/02/Behance.png"),
    require("./categories/02/DeviantArt.png"),
    require("./categories/02/Dribbble.png"),
    require("./categories/02/Figma.png"),
    require("./categories/02/Framer.png"),
    require("./categories/02/Giphy.png"),
    require("./categories/02/Invision.png"),
    require("./categories/02/Tenor.png"),
  ]);

  const [f3, ff3] = useAssets([
    require("./categories/03/AngelList.png"),
    require("./categories/03/BuyMeACoffee.png"),
    require("./categories/03/GofundMe.png"),
    require("./categories/03/Kickstarter.png"),
    require("./categories/03/Mastercard.png"),
    require("./categories/03/OpenCollective.png"),
    require("./categories/03/Patreon.png"),
    require("./categories/03/Payoneer.png"),
    require("./categories/03/PayPal.png"),
    require("./categories/03/Visa.png"),
  ]);

  const [f4, ff4] = useAssets([
    require("./categories/04/Badoo.png"),
    require("./categories/04/Tinder.png"),
  ]);

  const [f5, ff5] = useAssets([
    require("./categories/05/Quora.png"),
    require("./categories/05/Reddit.png"),
  ]);

  const [f6, ff6] = useAssets([
    require("./categories/06/500px.png"),
    require("./categories/06/Flickr.png"),
    require("./categories/06/Imgur.png"),
    require("./categories/06/Instagram.png"),
    require("./categories/06/Pinterest.png"),
    require("./categories/06/Snapchat.png"),
    require("./categories/06/Vero.png"),
  ]);

  const [f7, ff7] = useAssets([require("./categories/07/Twitch.png")]);

  const [f8, ff8] = useAssets([require("./categories/08/Amazon.png")]);

  const [f9, ff9] = useAssets([
    require("./categories/09/Baidu.png"),
    require("./categories/09/Bing.png"),
    require("./categories/09/DuckDuckGo.png"),
    require("./categories/09/Google.png"),
    require("./categories/09/YandexBrowser.png"),
  ]);

  const [f10, ff10] = useAssets([
    require("./categories/10/AskFm.png"),
    require("./categories/10/Discord.png"),
    require("./categories/10/FaceTime.png"),
    require("./categories/10/Gmail.png"),
    require("./categories/10/Hangouts.png"),
    require("./categories/10/KakaoTalk.png"),
    require("./categories/10/Line.png"),
    require("./categories/10/Mail_ru.png"),
    require("./categories/10/Messenger.png"),
    require("./categories/10/Signal.png"),
    require("./categories/10/Skype.png"),
    require("./categories/10/Slack.png"),
    require("./categories/10/Telegram.png"),
    require("./categories/10/Viber.png"),
    require("./categories/10/Wechat.png"),
    require("./categories/10/WhatsApp.png"),
    require("./categories/10/Zoom.png"),
  ]);

  const [f11, ff11] = useAssets([
    require("./categories/11/Blogger.png"),
    require("./categories/11/Facebook.png"),
    require("./categories/11/LinkedIn.png"),
    require("./categories/11/Medium.png"),
    require("./categories/11/Pocket.png"),
    require("./categories/11/RSS.png"),
    require("./categories/11/Tumblr.png"),
    require("./categories/11/Twitter.png"),
    require("./categories/11/VK.png"),
    require("./categories/11/Weibo.png"),
    require("./categories/11/Wordpress.png"),
    require("./categories/11/Yahoo.png"),
  ]);

  const [f12, ff12] = useAssets([
    require("./categories/12/Dropbox.png"),
    require("./categories/12/Mega.png"),
    require("./categories/12/OneDrive.png"),
    require("./categories/12/WeTransfer.png"),
  ]);

  const [f13, ff13] = useAssets([
    require("./categories/13/Bitbucket.png"),
    require("./categories/13/Codeopen.png"),
    require("./categories/13/Github.png"),
    require("./categories/13/GitLab.png"),
    require("./categories/13/Mastodon.png"),
    require("./categories/13/Serverfault.png"),
    require("./categories/13/StackExchange.png"),
    require("./categories/13/StackOverflow.png"),
    require("./categories/13/SuperUser.png"),
  ]);

  const [f14, ff14] = useAssets([
    require("./categories/14/Dailymotion.png"),
    require("./categories/14/IGTV.png"),
    require("./categories/14/Netflix.png"),
    require("./categories/14/TikTok.png"),
    require("./categories/14/Trovo.png"),
    require("./categories/14/Vimeo.png"),
    require("./categories/14/Youtube.png"),
  ]);

  const [f15, ff15] = useAssets([
    require("./categories/15/EpicGames.png"),
    require("./categories/15/Nintendo.png"),
    require("./categories/15/Playstation.png"),
    require("./categories/15/Steam.png"),
    require("./categories/15/Xbox.png"),
  ]);

  useEffect(() => {
    if (
      f0 &&
      f1 &&
      f2 &&
      f3 &&
      f4 &&
      f5 &&
      f5 &&
      f6 &&
      f7 &&
      f8 &&
      f9 &&
      f10 &&
      f11 &&
      f12 &&
      f13 &&
      f14 &&
      f15
    ) {
      let images = [
        {
          assets: f0,
          folder: "00",
        },
        {
          assets: f1,
          folder: "01",
        },
        {
          assets: f2,
          folder: "02",
        },
        {
          assets: f3,
          folder: "03",
        },
        {
          assets: f4,
          folder: "04",
        },
        {
          assets: f5,
          folder: "05",
        },
        {
          assets: f6,
          folder: "06",
        },
        {
          assets: f7,
          folder: "07",
        },
        {
          assets: f8,
          folder: "08",
        },
        {
          assets: f9,
          folder: "09",
        },
        {
          assets: f10,
          folder: "10",
        },
        {
          assets: f11,
          folder: "11",
        },
        {
          assets: f12,
          folder: "12",
        },
        {
          assets: f13,
          folder: "13",
        },
        {
          assets: f14,
          folder: "14",
        },
        {
          assets: f15,
          folder: "15",
        },
      ];

      Icons.init(images)
        .then(() => {
          console.log("ok");
        })
        .catch((err) => {
          Alert.alert(err.message, err + "\n" + JSON.stringify(err, null, 4));
        })
        .finally(() => {
          setReady(true);
        });
    }
  }, [f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15]);

  return isReady;
};

export default useImageLoaderStatus;
