<template>
	<view>
		<view class="baidi">
			<view class="toptype flexd jubetween" :style="{paddingTop:htosp +'rpx'}">
				<image class="backs" src="/static/image/icon_gb.png" mode="" @click="$jumpback()"></image>
				<view class="titla texcenter">{{tita}}</view>
			</view>
		</view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" :class="popupLayerClass" :style="keepkond" scroll-y="true"
				:scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView"
				@scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'">
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msg.type=='redEnvelope'" class="red-envelope">
								<image src="/static/img/red-envelope-chat.png"></image>
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==myuid">
							<view class="time texcenter">{{timeChange(row.msg.time)}}</view>
							<view class="flexd" style="justify-content:flex-end;">
								<!-- 左-消息 -->
								<view class="left">
									<!-- 文字消息 -->
									<view v-if="row.msg.type=='text'" class="bubble">
										<rich-text :nodes="row.msg.content.text"></rich-text>
									</view>
									<!-- 图片消息 -->
									<view v-if="row.msg.type=='img'" class="bubble img"
										@tap="showPic(row.msg.content.url)">
										<image mode="aspectFill" :src="imageurl + row.msg.content.url"
											:style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}">
										</image>
									</view>

								</view>
								<!-- 右-头像 -->
								<view class="right">
									<image :src="imageurl+row.msg.userinfo.face"></image>
								</view>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.uid!=myuid">
							<view class="time texcenter">{{timeChange(row.msg.time)}}</view>
							<!-- 左-头像 -->
							<view class="flexd">
								<view class="left">
									<image :src="imageurl+row.msg.userinfo.face"></image>
								</view>
								<!-- 右-用户名称-时间-消息 -->
								<view class="right">
									<!-- 文字消息 -->
									<view v-if="row.msg.type=='text'" class="bubble">
										<rich-text :nodes="row.msg.content.text"></rich-text>
									</view>
									<!-- 图片消息 -->
									<view v-if="row.msg.type=='img'" class="bubble img"
										@tap="showPic(row.msg.content.url)">
										<image mode="aspectFill" :src="imageurl + row.msg.content.url"
											:style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}">
										</image>
									</view>
								</view>
							</view>

						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="imageurl+'static/img/emoji2/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<image src="/static/HM-chat/img_xc.png" mode=""></image>
						<view class="texcenter">相册</view>
					</view>
					<view class="box" @tap="camera">
						<image src="/static/HM-chat/img_ps.png" mode=""></image>
						<view class="texcenter">拍照</view>
					</view>
					<view class="box" @tap="$callphone(toUserPhone)">
						<image src="/static/HM-chat/phone.jpg" mode=""></image>
						<view class="texcenter">电话</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard"
			:style="{bottom:keyHeight+'%'}">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- <view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view> -->

			<view class="textbox">
				<view class="text-mode">
					<view class="box">
						<textarea auto-height="true" :adjust-position="false" :auto-blur="true"
							:show-confirm-bar="false" v-model="textMsg" :cursor-spacing='20' @blur="keyHeight = 0"
							@click="textareaClick"></textarea>
					</view>
				</view>
			</view>
			<view class="em" @tap="chooseEmoji">
				<view class="icon biaoqing"></view>
			</view>
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				htosp: 0,
				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: true,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				msgImgList: [],
				myuid: 0,

				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,

				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				// emojiList:[
				// 	[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[囧]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[酷]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[奇]"},{"url":"123.gif",alt:"[傲]"}],
				// 	[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[鬼]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[汗]"},{"url":"141.gif",alt:"[抠]"},{"url":"142.gif",alt:"[鼓掌]"},{"url":"143.gif",alt:"[糟糕]"},{"url":"144.gif",alt:"[恶搞]"},{"url":"145.gif",alt:"[什么]"},{"url":"146.gif",alt:"[什么]"},{"url":"147.gif",alt:"[累]"}],
				// 	[{"url":"148.gif",alt:"[看]"},{"url":"149.gif",alt:"[难过]"},{"url":"150.gif",alt:"[难过]"},{"url":"151.gif",alt:"[坏]"},{"url":"152.gif",alt:"[亲]"},{"url":"153.gif",alt:"[吓]"},{"url":"154.gif",alt:"[可怜]"},{"url":"155.gif",alt:"[刀]"},{"url":"156.gif",alt:"[水果]"},{"url":"157.gif",alt:"[酒]"},{"url":"158.gif",alt:"[篮球]"},{"url":"159.gif",alt:"[乒乓]"},{"url":"160.gif",alt:"[咖啡]"},{"url":"161.gif",alt:"[美食]"},{"url":"162.gif",alt:"[动物]"},{"url":"163.gif",alt:"[鲜花]"},{"url":"164.gif",alt:"[枯]"},{"url":"165.gif",alt:"[唇]"},{"url":"166.gif",alt:"[爱]"},{"url":"167.gif",alt:"[分手]"},{"url":"168.gif",alt:"[生日]"},{"url":"169.gif",alt:"[电]"},{"url":"170.gif",alt:"[炸弹]"},{"url":"171.gif",alt:"[刀子]"}],
				// 	[{"url":"172.gif",alt:"[足球]"},{"url":"173.gif",alt:"[瓢虫]"},{"url":"174.gif",alt:"[翔]"},{"url":"175.gif",alt:"[月亮]"},{"url":"176.gif",alt:"[太阳]"},{"url":"177.gif",alt:"[礼物]"},{"url":"178.gif",alt:"[抱抱]"},{"url":"179.gif",alt:"[拇指]"},{"url":"180.gif",alt:"[贬低]"},{"url":"181.gif",alt:"[握手]"},{"url":"182.gif",alt:"[剪刀手]"},{"url":"183.gif",alt:"[抱拳]"},{"url":"184.gif",alt:"[勾引]"},{"url":"185.gif",alt:"[拳头]"},{"url":"186.gif",alt:"[小拇指]"},{"url":"187.gif",alt:"[拇指八]"},{"url":"188.gif",alt:"[食指]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[情侣]"},{"url":"191.gif",alt:"[爱心]"},{"url":"192.gif",alt:"[蹦哒]"},{"url":"193.gif",alt:"[颤抖]"},{"url":"194.gif",alt:"[怄气]"},{"url":"195.gif",alt:"[跳舞]"}],
				// 	[{"url":"196.gif",alt:"[发呆]"},{"url":"197.gif",alt:"[背着]"},{"url":"198.gif",alt:"[伸手]"},{"url":"199.gif",alt:"[耍帅]"},{"url":"200.png",alt:"[微笑]"},{"url":"201.png",alt:"[生病]"},{"url":"202.png",alt:"[哭泣]"},{"url":"203.png",alt:"[吐舌]"},{"url":"204.png",alt:"[迷糊]"},{"url":"205.png",alt:"[瞪眼]"},{"url":"206.png",alt:"[恐怖]"},{"url":"207.png",alt:"[忧愁]"},{"url":"208.png",alt:"[眨眉]"},{"url":"209.png",alt:"[闭眼]"},{"url":"210.png",alt:"[鄙视]"},{"url":"211.png",alt:"[阴暗]"},{"url":"212.png",alt:"[小鬼]"},{"url":"213.png",alt:"[礼物]"},{"url":"214.png",alt:"[拜佛]"},{"url":"215.png",alt:"[力量]"},{"url":"216.png",alt:"[金钱]"},{"url":"217.png",alt:"[蛋糕]"},{"url":"218.png",alt:"[彩带]"},{"url":"219.png",alt:"[礼物]"},]				
				// ],
				emojiList: [
					[{
						"url": "emoji_1.png",
						alt: "[大笑]"
					}, {
						"url": "emoji_2.png",
						alt: "[微笑]"
					}, {
						"url": "emoji_3.png",
						alt: "[羞涩微笑]"
					}, {
						"url": "emoji_4.png",
						alt: "[眨眼]"
					}, {
						"url": "emoji_5.png",
						alt: "[飞吻]"
					}, {
						"url": "emoji_6.png",
						alt: "[花痴]"
					}, {
						"url": "emoji_7.png",
						alt: "[微笑亲亲]"
					}, {
						"url": "emoji_8.png",
						alt: "[单眼吐舌]"
					}, {
						"url": "emoji_9.png",
						alt: "[眯眼吐舌]"
					}, {
						"url": "emoji_10.png",
						alt: "[脸红]"
					}, {
						"url": "emoji_11.png",
						alt: "[龇牙咧嘴]"
					}, {
						"url": "emoji_12.png",
						alt: "[沉思]"
					}, {
						"url": "emoji_13.png",
						alt: "[松了口气]"
					}, {
						"url": "emoji_14.png",
						alt: "[不高兴]"
					}, {
						"url": "emoji_15.png",
						alt: "[失望]"
					}, {
						"url": "emoji_16.png",
						alt: "[痛苦]"
					}, {
						"url": "emoji_17.png",
						alt: "[哭]"
					}, {
						"url": "emoji_18.png",
						alt: "[笑哭]"
					}, {
						"url": "emoji_19.png",
						alt: "[放声大哭]"
					}, {
						"url": "emoji_20.png",
						alt: "[困]"
					}, {
						"url": "emoji_21.png",
						alt: "[失望]"
					}, {
						"url": "emoji_22.png",
						alt: "[失望但如释重负]"
					}, {
						"url": "emoji_23.png",
						alt: "[汗]"
					}, {
						"url": "emoji_24.png",
						alt: "[冷汗]"
					}, ],
					[{
						"url": "emoji_25.png",
						alt: "[累死了]"
					}, {
						"url": "emoji_26.png",
						alt: "[累]"
					}, {
						"url": "emoji_27.png",
						alt: "[害怕]"
					}, {
						"url": "emoji_28.png",
						alt: "[吓死了]"
					}, {
						"url": "emoji_29.png",
						alt: "[生气]"
					}, {
						"url": "emoji_30.png",
						alt: "[怒火中烧]"
					}, {
						"url": "emoji_31.png",
						alt: "[傲慢]"
					}, {
						"url": "emoji_32.png",
						alt: "[困惑]"
					}, {
						"url": "emoji_33.png",
						alt: "[斜眼笑]"
					}, {
						"url": "emoji_34.png",
						alt: "[好吃]"
					}, {
						"url": "emoji_35.png",
						alt: "[口罩]"
					}, {
						"url": "emoji_36.png",
						alt: "[墨镜笑脸]"
					}, {
						"url": "emoji_37.png",
						alt: "[睡着了]"
					}, {
						"url": "emoji_38.png",
						alt: "[吃惊]"
					}, {
						"url": "emoji_39.png",
						alt: "[震惊]"
					}, {
						"url": "emoji_40.png",
						alt: "[微微不满]"
					}, {
						"url": "emoji_41.png",
						alt: "[不满]"
					}, {
						"url": "emoji_42.png",
						alt: "[非常不满]"
					}, {
						"url": "emoji_43.png",
						alt: "[缄默]"
					}, {
						"url": "emoji_44.png",
						alt: "[冷漠]"
					}, {
						"url": "emoji_45.png",
						alt: "[困扰]"
					}, {
						"url": "emoji_46.png",
						alt: "[惊讶]"
					}, {
						"url": "emoji_47.png",
						alt: "[沉默]"
					}, {
						"url": "emoji_48.png",
						alt: "[微笑天使]"
					}, ],
					[{
						"url": "emoji_49.png",
						alt: "[得意]"
					}, {
						"url": "emoji_50.png",
						alt: "[无语]"
					}, {
						"url": "emoji_51.png",
						alt: "[大便]"
					}, {
						"url": "emoji_52.png",
						alt: "[火焰]"
					}, {
						"url": "emoji_53.png",
						alt: "[拇指向上]"
					}, {
						"url": "emoji_54.png",
						alt: "[拇指向下]"
					}, {
						"url": "emoji_55.png",
						alt: "[OK]"
					}, {
						"url": "emoji_56.png",
						alt: "[拳头]"
					}, {
						"url": "emoji_57.png",
						alt: "[举起拳头]"
					}, {
						"url": "emoji_58.png",
						alt: "[胜利]"
					}, {
						"url": "emoji_59.png",
						alt: "[举起手]"
					}, {
						"url": "emoji_60.png",
						alt: "[张开双手]"
					}, {
						"url": "emoji_61.png",
						alt: "[上]"
					}, {
						"url": "emoji_62.png",
						alt: "[下]"
					}, {
						"url": "emoji_63.png",
						alt: "[右]"
					}, {
						"url": "emoji_64.png",
						alt: "[左]"
					}, {
						"url": "emoji_65.png",
						alt: "[祈祷]"
					}, {
						"url": "emoji_66.png",
						alt: "[食指]"
					}, {
						"url": "emoji_67.png",
						alt: "[鼓掌]"
					}, {
						"url": "emoji_68.png",
						alt: "[强壮]"
					}, {
						"url": "emoji_69.png",
						alt: "[红心]"
					}, {
						"url": "emoji_70.png",
						alt: "[心碎]"
					}, {
						"url": "emoji_71.png",
						alt: "[唇印]"
					}, {
						"url": "emoji_72.png",
						alt: "[钻石]"
					}, ]
				],
				//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要

				onlineEmoji: {
					"100.gif": "AbNQgA.gif",
					"101.gif": "AbN3ut.gif",
					"102.gif": "AbNM3d.gif",
					"103.gif": "AbN8DP.gif",
					"104.gif": "AbNljI.gif",
					"105.gif": "AbNtUS.gif",
					"106.gif": "AbNGHf.gif",
					"107.gif": "AbNYE8.gif",
					"108.gif": "AbNaCQ.gif",
					"109.gif": "AbNN4g.gif",
					"110.gif": "AbN0vn.gif",
					"111.gif": "AbNd3j.gif",
					"112.gif": "AbNsbV.gif",
					"113.gif": "AbNwgs.gif",
					"114.gif": "AbNrD0.gif",
					"115.gif": "AbNDuq.gif",
					"116.gif": "AbNg5F.gif",
					"117.gif": "AbN6ET.gif",
					"118.gif": "AbNcUU.gif",
					"119.gif": "AbNRC4.gif",
					"120.gif": "AbNhvR.gif",
					"121.gif": "AbNf29.gif",
					"122.gif": "AbNW8J.gif",
					"123.gif": "AbNob6.gif",
					"124.gif": "AbN5K1.gif",
					"125.gif": "AbNHUO.gif",
					"126.gif": "AbNIDx.gif",
					"127.gif": "AbN7VK.gif",
					"128.gif": "AbNb5D.gif",
					"129.gif": "AbNX2d.gif",
					"130.gif": "AbNLPe.gif",
					"131.gif": "AbNjxA.gif",
					"132.gif": "AbNO8H.gif",
					"133.gif": "AbNxKI.gif",
					"134.gif": "AbNzrt.gif",
					"135.gif": "AbU9Vf.gif",
					"136.gif": "AbUSqP.gif",
					"137.gif": "AbUCa8.gif",
					"138.gif": "AbUkGQ.gif",
					"139.gif": "AbUFPg.gif",
					"140.gif": "AbUPIS.gif",
					"141.gif": "AbUZMn.gif",
					"142.gif": "AbUExs.gif",
					"143.gif": "AbUA2j.gif",
					"144.gif": "AbUMIU.gif",
					"145.gif": "AbUerq.gif",
					"146.gif": "AbUKaT.gif",
					"147.gif": "AbUmq0.gif",
					"148.gif": "AbUuZV.gif",
					"149.gif": "AbUliF.gif",
					"150.gif": "AbU1G4.gif",
					"151.gif": "AbU8z9.gif",
					"152.gif": "AbU3RJ.gif",
					"153.gif": "AbUYs1.gif",
					"154.gif": "AbUJMR.gif",
					"155.gif": "AbUadK.gif",
					"156.gif": "AbUtqx.gif",
					"157.gif": "AbUUZ6.gif",
					"158.gif": "AbUBJe.gif",
					"159.gif": "AbUdIO.gif",
					"160.gif": "AbU0iD.gif",
					"161.gif": "AbUrzd.gif",
					"162.gif": "AbUDRH.gif",
					"163.gif": "AbUyQA.gif",
					"164.gif": "AbUWo8.gif",
					"165.gif": "AbU6sI.gif",
					"166.gif": "AbU2eP.gif",
					"167.gif": "AbUcLt.gif",
					"168.gif": "AbU4Jg.gif",
					"169.gif": "AbURdf.gif",
					"170.gif": "AbUhFS.gif",
					"171.gif": "AbU5WQ.gif",
					"172.gif": "AbULwV.gif",
					"173.gif": "AbUIzj.gif",
					"174.gif": "AbUTQs.gif",
					"175.gif": "AbU7yn.gif",
					"176.gif": "AbUqe0.gif",
					"177.gif": "AbUHLq.gif",
					"178.gif": "AbUOoT.gif",
					"179.gif": "AbUvYF.gif",
					"180.gif": "AbUjFU.gif",
					"181.gif": "AbaSSJ.gif",
					"182.gif": "AbUxW4.gif",
					"183.gif": "AbaCO1.gif",
					"184.gif": "Abapl9.gif",
					"185.gif": "Aba9yR.gif",
					"186.gif": "AbaFw6.gif",
					"187.gif": "Abaiex.gif",
					"188.gif": "AbakTK.gif",
					"189.gif": "AbaZfe.png",
					"190.gif": "AbaEFO.gif",
					"191.gif": "AbaVYD.gif",
					"192.gif": "AbamSH.gif",
					"193.gif": "AbaKOI.gif",
					"194.gif": "Abanld.gif",
					"195.gif": "Abau6A.gif",
					"196.gif": "AbaQmt.gif",
					"197.gif": "Abal0P.gif",
					"198.gif": "AbatpQ.gif",
					"199.gif": "Aba1Tf.gif",
					"200.png": "Aba8k8.png",
					"201.png": "AbaGtS.png",
					"202.png": "AbaJfg.png",
					"203.png": "AbaNlj.png",
					"204.png": "Abawmq.png",
					"205.png": "AbaU6s.png",
					"206.png": "AbaaXn.png",
					"207.png": "Aba000.png",
					"208.png": "AbarkT.png",
					"209.png": "AbastU.png",
					"210.png": "AbaB7V.png",
					"211.png": "Abafn1.png",
					"212.png": "Abacp4.png",
					"213.png": "AbayhF.png",
					"214.png": "Abag1J.png",
					"215.png": "Aba2c9.png",
					"216.png": "AbaRXR.png",
					"217.png": "Aba476.png",
					"218.png": "Abah0x.png",
					"219.png": "Abdg58.png"
				},
				//红包相关参数
				windowsState: '',
				redenvelopeData: {
					rid: null, //红包ID
					from: null,
					face: null,
					blessing: null,
					money: null
				},
				keyHeight: 0,
				toUserId: '',
				toUserPhone: '',
				tita: '',
				imageurl: '',
				nextPage: false,
				newlist: '',
				curPage: 2,
				keepkond: '',
				fromUserId: '',
				usephone: '',
				isNext: false,
				nextObj: {}
			};
		},
		onLoad(option) {
			this.toUserId = option.idse;
			this.imageurl = this.globalData.imageurl;
			this.htosp = uni.getStorageSync('htop');
			let userType = uni.getStorageSync('userType');
			// userType: 用户类型( 1.平台用户 2用户端用户 3业务员 4老板 5代理用户 6安装运维用户)
			this.fromUserId = uni.getStorageSync('userId')
			this.usephone = uni.getStorageSync('userInfo').phone;
			this.getMsgList();

		},
		onShow() {
			console.log('HM-chat Show')
			this.util.weeksort(e => {
				this.onMessageSo();
			})

			this.scrollTop = 9999999;
		},
		methods: {
			// 加载初始页面消息
			getMsgList() {
				let that = this;
				that.util.ajax('contact/queryChatLogList', {
					"fromUserId": that.fromUserId,
					"toUserId": that.toUserId,
					"curPage": 1,
					"pageSize": '10'
				}, function(res) {
					if (res.data.chatLogList.length !== 0) {
						that.newlist = res.data.chatLogList[0].id;
					}

					that.nextPage = res.data.page.nextPage;
					that.toUserPhone = res.data.toUserIdInfo.phone;
					that.tita = res.data.toUserIdInfo.nick_name;
					let chatLogList = res.data.chatLogList;
					let list = [];
					for (let i in chatLogList) {
						let face = ''
						if (chatLogList[i].from_user_id == res.data.fromMemberInfo.id) {
							face = res.data.fromMemberInfo.head_img
						} else if (chatLogList[i].from_user_id == res.data.toUserIdInfo.user_id) {
							face = res.data.toUserIdInfo.head_img
						}
						if (chatLogList[i].message_type == 0) {
							let cont = chatLogList[i].message_content;
							let caijian = cont.replace(/display: flex;/, "");
							list.push({
								type: 'user',
								msg: {
									id: chatLogList[i].id,
									type: 'text',
									time: chatLogList[i].createtime,
									userinfo: {
										uid: chatLogList[i].from_user_id == that.fromUserId ?
											0 : 1,
										face: face
									},
									content: {
										text: caijian
									}
								}
							})
						} else if (chatLogList[i].message_type == 1) {
							list.push({
								type: 'user',
								msg: {
									id: chatLogList[i].id,
									type: 'img',
									time: chatLogList[i].createtime,
									userinfo: {
										uid: chatLogList[i].from_user_id == that.fromUserId ?
											0 : 1,
										face: face
									},
									content: {
										url: chatLogList[i].message_content,
										w: 200,
										h: 200
									}
								}
							})
						}
					}
					// 获取消息中的图片,并处理显示尺寸
					for (let i = 0; i < list.length; i++) {
						if (list[i].type == 'user' && list[i].msg.type == "img") {
							list[i].msg.content = that.setPicSize(list[i].msg.content);
							that.msgImgList.unshift(list[i].msg.content.url);
						}
						that.msgList.unshift(list[i]);
					}
					// 滚动到底部
					setTimeout(() => {
						that.scrollTop++;
						uni.hideLoading();
					}, 500)
				})
			},
			tianjia() {
				let that = this;
				let msgCount = 1;
				that.util.ajax('contact/queryChatLogList', {
					"fromUserId": that.fromUserId,
					"toUserId": that.toUserId,
					"curPage": 1,
					"pageSize": '10'
				}, function(res) {
					that.nextPage = res.data.page.nextPage;
					let chatLogList = res.data.chatLogList;
					let list = [];
					console.log('newlist*****', that.newlist);
					for (let i in chatLogList) {

						if (chatLogList[i].id == that.newlist) {
							msgCount = i;
						}
					}
					for (let i in chatLogList) {
						let face = ''
						if (chatLogList[i].from_user_id == res.data.fromMemberInfo.id) {
							face = res.data.fromMemberInfo.head_img
						} else if (chatLogList[i].from_user_id == res.data.toUserIdInfo.id) {
							face = res.data.toUserIdInfo.head_img
						}
						if (i < msgCount) {
							if (chatLogList[i].message_type == 0) {
								let cont = chatLogList[i].message_content;
								let caijian = cont.replace(/display: flex;/, "");
								list.push({
									type: 'user',
									msg: {
										id: chatLogList[i].id,
										type: 'text',
										time: chatLogList[i].createtime,
										userinfo: {
											uid: chatLogList[i].from_user_id == that.fromUserId ?
												0 : 1,
											face: face
										},
										content: {
											text: caijian
										}
									}
								})
							} else if (chatLogList[i].message_type == 1) {
								list.push({
									type: 'user',
									msg: {
										id: chatLogList[i].id,
										type: 'img',
										time: chatLogList[i].createtime,
										userinfo: {
											uid: chatLogList[i].from_user_id == that.fromUserId ?
												0 : 1,
											face: face
										},
										content: {
											url: chatLogList[i].message_content,
											w: 200,
											h: 200
										}
									}
								})
							}
						}
					}
					// 获取消息中的图片,并处理显示尺寸
					for (let i = 0; i < list.length; i++) {
						if (list[i].type == 'user' && list[i].msg.type == "img") {
							list[i].msg.content = that.setPicSize(list[i].msg.content);
							that.msgImgList.push(list[i].msg.content.url);
						}
						that.msgList.push(list[i]);
					}
					that.newlist = that.msgList[0].id;
					// 滚动到底部
					setTimeout(() => {
						that.scrollTop++;
						if (that.isNext) {
							that.upimg(that.nextObj.list, that.nextObj.i)
						}
						uni.hideLoading();
					}, 500)
				})
			},
			onMessageSo() {
				//监听socket消息
				console.log('开启监听')
				let that = this;
				that.util.getsort(function(res) {
					let mysid = res.data.messageContent;
					let tophone = mysid.substring(0, mysid.indexOf('@'));
					let isphone = that.usephone;
					if (tophone == that.toUserPhone || tophone == isphone) {
						that.tianjia();
					}

				})
			},

			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				let that = this;
				if (that.nextPage) {
					uni.showLoading({
						title: '加载中'
					})
					if (that.isHistoryLoading) {
						return;
					}
					that.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
					that.scrollAnimation = true; //关闭滑动动画
					that.util.ajax('contact/queryChatLogList', {
						"fromUserId": that.fromUserId,
						"toUserId": that.toUserId,
						"curPage": that.curPage,
						"pageSize": '10'
					}, function(res) {
						that.curPage = that.curPage + 1;
						that.nextPage = res.data.page.nextPage;
						let chatLogList = res.data.chatLogList;
						let list = [];
						//setTimeout(()=>{
						for (let i in chatLogList) {
							if (chatLogList[i].message_type == 0) {
								let cont = chatLogList[i].message_content;
								let caijian = cont.replace(/display: flex;/, "");
								list.push({
									type: 'user',
									msg: {
										id: chatLogList[i].id,
										type: 'text',
										time: chatLogList[i].createtime,
										userinfo: {
											uid: chatLogList[i].from_user_id == that.fromUserId ?
												0 : 1,
											face: chatLogList[i].head_img
										},
										content: {
											text: caijian
										}
									}
								})
							} else if (chatLogList[i].message_type == 1) {
								list.push({
									type: 'user',
									msg: {
										id: chatLogList[i].id,
										type: 'img',
										time: chatLogList[i].createtime,
										userinfo: {
											uid: chatLogList[i].from_user_id == that.fromUserId ?
												0 : 1,
											face: chatLogList[i].head_img
										},
										content: {
											url: chatLogList[i].message_content,
											w: 200,
											h: 200
										}
									}
								})
							}
						}
						// 获取消息中的图片,并处理显示尺寸
						for (let i = 0; i < list.length; i++) {
							if (list[i].type == 'user' && list[i].msg.type == "img") {
								list[i].msg.content = that.setPicSize(list[i].msg.content);
								that.msgImgList.unshift(list[i].msg.content.url);
							}
							list[i].msg.id = Math.floor(Math.random() * 1000 + 1);
							that.msgList.unshift(list[i]);
						}

						setTimeout(() => {
							that.scrollTop = 9;
							uni.hideLoading();
						}, 500)
						that.isHistoryLoading = false;
						//},1000)
					})
				}
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = scale > 1 ? maxW : maxH * scale;
					content.h = scale > 1 ? maxW / scale : maxH;
				}
				return content;
			},

			//更多功能(点击+弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				this.keepkond = '';
				this.keyHeight = 0;
				// uni.offKeyboardHeightChange();
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			//选照片 or 拍照
			getImage(type) {
				let that = this;
				getApp().backtall = null;
				//uni.closeSocket();
				uni.chooseImage({
					count: 9,
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {

						// that.util.weeksort(function (x){
						// 	that.onMessageSo();
						// })
						for (let i in res.tempFiles) {
							// 1TB=1024GB 1GB=1024MB 1MB=1024KB 1KB=1024Byte
							let sizes = res.tempFiles[i].size / 1024 / 1024;
							if (sizes > 5) {
								uni.showToast({
									title: '图片不得大于5M',
									icon: 'none'
								})
								return
							}
						}
						uni.showLoading({
							title: '上传中'
						})
						that.upimg(res.tempFiles, 0)
					}
				});
			},
			upimg(imglist, i) {
				let that = this
				console.log(i, imglist[i])
				uni.uploadFile({
					url: that.globalData.url + 'CrossDomainOrdinaryServlet',
					name: 'image',
					formData: {},
					filePath: imglist[i].path,
					success: function(res) {
						uni.hideLoading();
						if (res.statusCode == 200) {
							let data = JSON.parse(res.data);
							let msg = data.url;

							if (i < imglist.length - 1) {
								that.isNext = true
								that.nextObj = {
									list: imglist,
									i: i + 1
								}
								that.sendMsg(msg, 'img');
							} else {
								that.isNext = false
								that.sendMsg(msg, 'img');
							}
						} else if (res.statusCode == 404) {
							uni.showModal({
								title: '提示',
								content: '404,访问地址不存在！',
								showCancel: false
							})
						} else if (res.statusCode == 502) {
							uni.showModal({
								title: '提示',
								content: '502,服务器无响应！',
								showCancel: false
							})
						}
					},
					fail: function(err) {
						uni.showModal({
							title: '提示',
							content: '网络状态不佳,请稍后再试！',
							showCancel: false
						})
					}
				});
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				setTimeout(() => {
					this.keyHeight = 0;
					this.keepkond = '';
				}, 150)
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaClick() {
				if (this.hideEmoji && this.hideMore && this.popupLayerClass == '') {
					let _sysInfo = uni.getSystemInfoSync()
					uni.onKeyboardHeightChange(res => {
						// 　let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight;
						let _diff = (res.height / _sysInfo.screenHeight).toFixed(2);
						let kaydaff = _diff * 100;
						if (kaydaff != 0) {
							this.keyHeight = kaydaff - 0.8;
							let tsoa = kaydaff + 1;
							this.keepkond = "transform: translate3d(0,-" + tsoa + "%,0)"
						} else {
							//setTimeout(() =>{
							this.keyHeight = 0;
							this.keepkond = '';
							//},150)
						}
					})
				} else {
					uni.hideKeyboard();
					this.hideDrawer();
				}
				setTimeout(() => {
					this.scrollTop = this.msgList.length * 999999;
				}, 500)

			},
			// 发送文字消息
			sendText() {
				this.hideDrawer(); //隐藏抽屉

				if (!this.textMsg) {
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = content;
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://linli-community-api.niuclub.net/image/emoji2/'
								let imgstr = '<img width="24" height="24" src="' + onlinePath + EM.url + '">';
								return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;word-wrap:break-word;">' + replacedStr + '</div>';
			},

			// 发送消息
			sendMsg(content, type, cb) {
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				let that = this;
				var nowDate = new Date();
				let msg = {
					type: 'user',
					msg: {
						id: 0,
						time: nowDate.getHours() + ":" + nowDate.getMinutes(),
						type: type,
						userinfo: {
							uid: 0,
							face: "/static/image/heardimg.png"
						},
						content: content
					}
				}
				let dataa = {
					"fromUserId": that.fromUserId,
					"toUserId": that.toUserId,
					"messageContent": content,
					"messageType": type == 'text' ? 0 : 1 //消息类型(0文本 1图片)
				}
				// 发送消息
				that.util.ajax('contact/sendMessage', dataa, function(res) {
					// 发送消息
					that.cheun(type, msg, cb);
					that.util.ajax('contact/queryChatLogList', {
						"fromUserId": that.fromUserId,
						"toUserId": that.toUserId,
						"curPage": 1,
						"pageSize": '10'
					}, function(res) {
						let chatLogList = res.data.chatLogList;
						let data = chatLogList[0]
						let face = ''
						if (data.from_user_id == res.data.fromMemberInfo.id) {
							face = res.data.fromMemberInfo.head_img
						} else if (data.from_user_id == res.data.toUserIdInfo.user_id) {
							face = res.data.toUserIdInfo.head_img
						}
						if (data.message_type == 0) {
							let cont = data.message_content;
							let caijian = cont.replace(/display: flex;/, "");
							that.msgList.push({
								type: 'user',
								msg: {
									id: data.id,
									type: 'text',
									time: data.createtime,
									userinfo: {
										uid: data.from_user_id == that.fromUserId ?
											0 : 1,
										face: face
									},
									content: {
										text: caijian
									}
								}
							})
						} else if (data.message_type == 1) {
							that.msgList.push({
								type: 'user',
								msg: {
									id: data.id,
									type: 'img',
									time: data.createtime,
									userinfo: {
										uid: data.from_user_id == that.fromUserId ?
											0 : 1,
										face: face
									},
									content: {
										url: data.message_content,
										w: 200,
										h: 200
									}
								}
							})
						}
						// 滚动到底部
						setTimeout(() => {
							that.scrollTop++;
							uni.hideLoading();
						}, 500)
					});
				});
			},
			// 上传聊天记录
			cheun(type, msg, cb) {
				// if(type == 'text'){
				// 	msg.msg.content.text = msg.msg.content.text.replace(/display: flex;/,"");
				// }
				let that = this;
				uni.showLoading({
					title: '发送中'
				})
				let jsonsa = {};
				jsonsa.messageType = 1; //0心跳包 1.单聊 2群聊
				jsonsa.toUserName = that.toUserPhone;
				jsonsa.messageContent = type;
				jsonsa.roomId = 0;
				jsonsa.appId = 'jqDpwZCDEMw37Uh3';

				uni.sendSocketMessage({
					data: JSON.stringify(jsonsa),
					success: (res) => {
						that.misshao = true;
						uni.hideLoading();
						// setTimeout(e=>{
						// 	cb&&cb()
						// },500)
					},
					fail: (e) => {
						console.log('fail', e)
						uni.hideLoading();
						//getApp().backtall = null;

						that.util.weeksort(function(res) {
							console.log('again')
							that.onMessageSo()
							that.cheun(type, msg)
						})
					}
				});
			},
			// 添加文字消息到列表
			addTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			addRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg) {
				this.msgList.push(msg);
			},
			// 预览图片
			showPic(url) {
				let inda = [];
				inda[0] = this.imageurl + url
				uni.previewImage({
					indicator: "none",
					current: this.imageurl + url,
					urls: inda
				});
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			// 是否为今年
			isYear(timeValue) {
				var dateyear = new Date(timeValue).getFullYear()
				var toyear = new Date().getFullYear()
				if (dateyear === toyear) {
					return true
				} else {
					return false
				}
			},
			formatTime(date) {
				var t = this.getTimeArray(date)
				return [t[0], t[1], t[2]].map(this.formatNumber).join('-') + ' ' + [t[3], t[4], t[5]].map(this
					.formatNumber).join(':')
			},
			getTimeArray(date) {
				date = new Date(date)
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				var day = date.getDate()
				var hour = date.getHours()
				var minute = date.getMinutes()
				var second = date.getSeconds()
				return [year, month, day, hour, minute, second].map(this.formatNumber)
			},
			// 转化日期 如2018-7-6 -->(2018-07-06)
			formatNumber(n) {
				n = n.toString()
				return n[1] ? n : '0' + n
			},
			isYestday(timeValue) { // 是否为昨天
				var date = new Date(timeValue)
				var today = new Date()
				if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
					if ((today.getDate()) - (date.getDate()) === 1) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			// 时间计算与格式的改变
			timeChange(timeValue) {
				// 切记 IOS系统只识别 " / " 不识别 " - "
				// timeValue = Date.parse(timeValue.replace(/-/g, '/'));
				var timeNew = new Date().getTime(); // 当前时间
				var timeDiffer = timeNew - timeValue; // 与当前时间误差

				var returnTime = '';
				// if (timeDiffer <= 60000) { // 一分钟内
				// 	returnTime = '刚刚';
				// } else if (timeDiffer > 60000 && timeDiffer < 600000) { // 10分钟内
				// 	returnTime = Math.floor(timeDiffer / 60000) + '分钟前';
				// } else if (timeDiffer >= 600000 && timeDiffer < 86400000 && this.isYestday(timeValue) === false) { // 今日
				if (timeDiffer < 86400000 && this.isYestday(timeValue) === false) { // 今日
					returnTime = this.formatTime(timeValue).substr(11, 5);
				} else if (timeDiffer >= 86400000 && timeDiffer < 86400000 * 2 && this.isYestday(timeValue) ===
					true) { // 昨天
					returnTime = '昨天' + this.formatTime(timeValue).substr(11, 5);
				} else if (timeDiffer > 86400000 * 2 && this.isYestday(timeValue) === false && this.isYear(timeValue) ===
					true) { // 今年
					returnTime = this.formatTime(timeValue).substr(5, 11);
				} else if (timeDiffer > 86400000 * 2 && this.isYestday(timeValue) === false && this.isYear(timeValue) ===
					false) { // 不属于今年
					returnTime = this.formatTime(timeValue).substr(0, 16);
				}
				return returnTime;
			},
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss";

	.toptype {
		background: #FFF;
		/* #ifdef MP-WEIXIN */
		padding-top: 45px;
		/* #endif */
	}
</style>
