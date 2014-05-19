/** 
 * Kana Quiz
 */

var Kana = function() {

	// Define the dictionaries
	var _dictionaries = {
		hb: [
			{ 'kana':'あ', 'romaji':'a' },
			{ 'kana':'い', 'romaji':'i' },
			{ 'kana':'う', 'romaji':'u' },
			{ 'kana':'え', 'romaji':'e' },
			{ 'kana':'お', 'romaji':'o' },
			{ 'kana':'か', 'romaji':'ka' },
			{ 'kana':'き', 'romaji':'ki' },
			{ 'kana':'く', 'romaji':'ku' },
			{ 'kana':'け', 'romaji':'ke' },
			{ 'kana':'こ', 'romaji':'ko' },
			{ 'kana':'さ', 'romaji':'sa' },
			{ 'kana':'し', 'romaji':'shi' },
			{ 'kana':'す', 'romaji':'su' },
			{ 'kana':'せ', 'romaji':'se' },
			{ 'kana':'そ', 'romaji':'so' },
			{ 'kana':'な', 'romaji':'na' },
			{ 'kana':'に', 'romaji':'ni' },
			{ 'kana':'ぬ', 'romaji':'nu' },
			{ 'kana':'ね', 'romaji':'ne' },
			{ 'kana':'の', 'romaji':'no' },
			{ 'kana':'は', 'romaji':'ha' },
			{ 'kana':'ひ', 'romaji':'hi' },
			{ 'kana':'ふ', 'romaji':'fu' },
			{ 'kana':'へ', 'romaji':'he' },
			{ 'kana':'ほ', 'romaji':'ho' },
			{ 'kana':'ら', 'romaji':'ra' },
			{ 'kana':'り', 'romaji':'ri' },
			{ 'kana':'る', 'romaji':'ru' },
			{ 'kana':'れ', 'romaji':'re' },
			{ 'kana':'ろ', 'romaji':'ro' },
			{ 'kana':'ま', 'romaji':'ma' },
			{ 'kana':'み', 'romaji':'mi' },
			{ 'kana':'む', 'romaji':'mu' },
			{ 'kana':'め', 'romaji':'me' },
			{ 'kana':'も', 'romaji':'mo' },
			{ 'kana':'や', 'romaji':'ya' },
			{ 'kana':'ゆ', 'romaji':'yu' },
			{ 'kana':'よ', 'romaji':'yo' },
			{ 'kana':'わ', 'romaji':'wa' },
			{ 'kana':'を', 'romaji':'wo' },
			{ 'kana':'ん', 'romaji':'n' }
		],
		hv: [
			{ 'kana':'が', 'romaji':'ga' },
			{ 'kana':'ぎ', 'romaji':'gi' },
			{ 'kana':'ぐ', 'romaji':'gu' },
			{ 'kana':'げ', 'romaji':'ge' },
			{ 'kana':'ご', 'romaji':'go' },
			{ 'kana':'ざ', 'romaji':'za' },
			{ 'kana':'じ', 'romaji':'ji' },
			{ 'kana':'ず', 'romaji':'zu' },
			{ 'kana':'ぜ', 'romaji':'ze' },
			{ 'kana':'ぞ', 'romaji':'zo' },
			{ 'kana':'ば', 'romaji':'ba' },
			{ 'kana':'び', 'romaji':'bi' },
			{ 'kana':'ぶ', 'romaji':'bu' },
			{ 'kana':'べ', 'romaji':'be' },
			{ 'kana':'ぼ', 'romaji':'bo' },
			{ 'kana':'ぱ', 'romaji':'pa' },
			{ 'kana':'ぴ', 'romaji':'pi' },
			{ 'kana':'ぷ', 'romaji':'pu' },
			{ 'kana':'ぺ', 'romaji':'pe' },
			{ 'kana':'ぽ', 'romaji':'po' }		
		],
		hc: [
			{ 'kana':'きゃ', 'romaji':'kya' },
			{ 'kana':'きゅ', 'romaji':'kyu' },
			{ 'kana':'きょ', 'romaji':'kyo' },
			{ 'kana':'しゃ', 'romaji':'sha' },
			{ 'kana':'しゅ', 'romaji':'shu' },
			{ 'kana':'しょ', 'romaji':'sho' },
			{ 'kana':'ちゃ', 'romaji':'cha' },
			{ 'kana':'ちゅ', 'romaji':'chu' },
			{ 'kana':'ちょ', 'romaji':'cho' },
			{ 'kana':'にゃ', 'romaji':'nya' },
			{ 'kana':'にゅ', 'romaji':'nyu' },
			{ 'kana':'にょ', 'romaji':'nyo' },
			{ 'kana':'ひゃ', 'romaji':'hya' },
			{ 'kana':'ひゅ', 'romaji':'hyu' },
			{ 'kana':'ひょ', 'romaji':'hyo' },
			{ 'kana':'みゃ', 'romaji':'mya' },
			{ 'kana':'みゅ', 'romaji':'myu' },
			{ 'kana':'みょ', 'romaji':'myo' },
			{ 'kana':'りゃ', 'romaji':'rya' },
			{ 'kana':'りゅ', 'romaji':'ryu' },
			{ 'kana':'りょ', 'romaji':'ryo' },
			{ 'kana':'ぎゃ', 'romaji':'gya' },
			{ 'kana':'ぎゅ', 'romaji':'gyu' },
			{ 'kana':'ぎょ', 'romaji':'gyo' },
			{ 'kana':'じゃ', 'romaji':'ja' },
			{ 'kana':'じゅ', 'romaji':'ju' },
			{ 'kana':'じょ', 'romaji':'jo' },
			{ 'kana':'びゃ', 'romaji':'bya' },
			{ 'kana':'びゅ', 'romaji':'byu' },
			{ 'kana':'びょ', 'romaji':'byo' },
			{ 'kana':'ぴゃ', 'romaji':'pya' },
			{ 'kana':'ぴゅ', 'romaji':'pyu' },
			{ 'kana':'ぴょ', 'romaji':'pyo' }		
		],
		kb: [
			{ 'kana':'ア', 'romaji':'a' },
			{ 'kana':'イ', 'romaji':'i' },
			{ 'kana':'ウ', 'romaji':'u' },
			{ 'kana':'エ', 'romaji':'e' },
			{ 'kana':'オ', 'romaji':'o' },
			{ 'kana':'カ', 'romaji':'ka' },
			{ 'kana':'キ', 'romaji':'ki' },
			{ 'kana':'ク', 'romaji':'ku' },
			{ 'kana':'ケ', 'romaji':'ke' },
			{ 'kana':'コ', 'romaji':'ko' },
			{ 'kana':'サ', 'romaji':'sa' },
			{ 'kana':'シ', 'romaji':'shi' },
			{ 'kana':'ス', 'romaji':'su' },
			{ 'kana':'セ', 'romaji':'se' },
			{ 'kana':'ソ', 'romaji':'so' },
			{ 'kana':'ナ', 'romaji':'na' },
			{ 'kana':'ニ', 'romaji':'ni' },
			{ 'kana':'ヌ', 'romaji':'nu' },
			{ 'kana':'ネ', 'romaji':'ne' },
			{ 'kana':'ノ', 'romaji':'no' },
			{ 'kana':'ハ', 'romaji':'ha' },
			{ 'kana':'ヒ', 'romaji':'hi' },
			{ 'kana':'フ', 'romaji':'fu' },
			{ 'kana':'ヘ', 'romaji':'he' },
			{ 'kana':'ホ', 'romaji':'ho' },
			{ 'kana':'マ', 'romaji':'ma' },
			{ 'kana':'ミ', 'romaji':'mi' },
			{ 'kana':'ム', 'romaji':'mu' },
			{ 'kana':'メ', 'romaji':'me' },
			{ 'kana':'モ', 'romaji':'mo' },
			{ 'kana':'ラ', 'romaji':'ra' },
			{ 'kana':'リ', 'romaji':'ri' },
			{ 'kana':'ル', 'romaji':'ru' },
			{ 'kana':'レ', 'romaji':'re' },
			{ 'kana':'ロ', 'romaji':'ro' },
			{ 'kana':'ヤ', 'romaji':'ya' },
			{ 'kana':'ユ', 'romaji':'yu' },
			{ 'kana':'ヨ', 'romaji':'yo' },
			{ 'kana':'ワ', 'romaji':'wa' },
			{ 'kana':'ン', 'romaji':'n' }		
		],
		kv: [
			{ 'kana':'ガ', 'romaji':'ga' },
			{ 'kana':'ギ', 'romaji':'gi' },
			{ 'kana':'グ', 'romaji':'gu' },
			{ 'kana':'ゲ', 'romaji':'ge' },
			{ 'kana':'ゴ', 'romaji':'go' },
			{ 'kana':'ザ', 'romaji':'za' },
			{ 'kana':'ジ', 'romaji':'ji' },
			{ 'kana':'ズ', 'romaji':'zu' },
			{ 'kana':'ゼ', 'romaji':'ze' },
			{ 'kana':'ゾ', 'romaji':'zo' },
			{ 'kana':'ダ', 'romaji':'da' },
			{ 'kana':'ジ', 'romaji':'ji' },
			{ 'kana':'ズ', 'romaji':'zu' },
			{ 'kana':'デ', 'romaji':'de' },
			{ 'kana':'ド', 'romaji':'do' },
			{ 'kana':'バ', 'romaji':'ba' },
			{ 'kana':'ビ', 'romaji':'bi' },
			{ 'kana':'ブ', 'romaji':'bu' },
			{ 'kana':'ベ', 'romaji':'be' },
			{ 'kana':'ボ', 'romaji':'bo' },
			{ 'kana':'パ', 'romaji':'pa' },
			{ 'kana':'ピ', 'romaji':'pi' },
			{ 'kana':'プ', 'romaji':'pu' },
			{ 'kana':'ペ', 'romaji':'pe' },
			{ 'kana':'ポ', 'romaji':'po' }	
		],
		kc: [
			{ 'kana':'キャ', 'romaji':'kya' },
			{ 'kana':'キュ', 'romaji':'kyu' },
			{ 'kana':'キョ', 'romaji':'kyo' },
			{ 'kana':'シャ', 'romaji':'sha' },
			{ 'kana':'シュ', 'romaji':'shu' },
			{ 'kana':'ショ', 'romaji':'sho' },
			{ 'kana':'チャ', 'romaji':'cha' },
			{ 'kana':'チュ', 'romaji':'chu' },
			{ 'kana':'チョ', 'romaji':'cho' },
			{ 'kana':'ニャ', 'romaji':'nya' },
			{ 'kana':'ニュ', 'romaji':'nyu' },
			{ 'kana':'ニョ', 'romaji':'nyo' },
			{ 'kana':'ヒャ', 'romaji':'hya' },
			{ 'kana':'ヒュ', 'romaji':'hyu' },
			{ 'kana':'ヒョ', 'romaji':'hyo' },
			{ 'kana':'ミャ', 'romaji':'mya' },
			{ 'kana':'ミュ', 'romaji':'myu' },
			{ 'kana':'ミョ', 'romaji':'myo' },
			{ 'kana':'リャ', 'romaji':'rya' },
			{ 'kana':'リュ', 'romaji':'ryu' },
			{ 'kana':'リョ', 'romaji':'ryo' },
			{ 'kana':'ギャ', 'romaji':'gya' },
			{ 'kana':'ギュ', 'romaji':'gyu' },
			{ 'kana':'ギョ', 'romaji':'gyo' },
			{ 'kana':'ジャ', 'romaji':'ja' },
			{ 'kana':'ジュ', 'romaji':'ju' },
			{ 'kana':'ジョ', 'romaji':'jo' },
			{ 'kana':'ビャ', 'romaji':'bya' },
			{ 'kana':'ビュ', 'romaji':'byu' },
			{ 'kana':'ビョ', 'romaji':'byo' },
			{ 'kana':'ピャ', 'romaji':'pya' },
			{ 'kana':'ピュ', 'romaji':'pyu' },
			{ 'kana':'ピョ', 'romaji':'pyo' }	
		],
		ke: [
			{ 'kana':'ヴァ', 'romaji':'va' },
			{ 'kana':'ヴィ', 'romaji':'vi' },
			{ 'kana':'ヴ', 'romaji':'vu' },
			{ 'kana':'ヴェ', 'romaji':'ve' },
			{ 'kana':'ヴォ', 'romaji':'vo' },
			{ 'kana':'ウィ', 'romaji':'wi' },
			{ 'kana':'ウェ', 'romaji':'wu' },
			{ 'kana':'ウォ', 'romaji':'wo' },
			{ 'kana':'ファ', 'romaji':'fa' },
			{ 'kana':'フィ', 'romaji':'fi' },
			{ 'kana':'フェ', 'romaji':'fe' },
			{ 'kana':'フォ', 'romaji':'fo' },
			{ 'kana':'ティ', 'romaji':'ti' },
			{ 'kana':'トゥ', 'romaji':'tu' },
			{ 'kana':'ディ', 'romaji':'di' },
			{ 'kana':'ドゥ', 'romaji':'du' },
			{ 'kana':'シェ', 'romaji':'she' },
			{ 'kana':'ジェ', 'romaji':'je' },
			{ 'kana':'チェ', 'romaji':'che' }	
		]
	};
	
	var _data = {
		dictionary: null,
		question: null,
		answers: null
	}

	var _options = {
		mode: 'en_to_jp',
		enabled: {
			hb: true,  // Hiragana basic
			hv: false, // Hiragana voiced
			hc: false, // Hiragana contracted
			kb: false, // Katakana basic
			kv: false, // Katakana voiced
			kc: false, // Katakana contracted
			ke: false, // Katakana extended
		}
	}

	var _private = {

		/** 
		 * Initialize
		 */
		init: function() {
			_private.setDictionary();
			_private.setQuestion();
			_private.setAnswers();
			return _public;
		},

		/** 
		 * Compile the active dictionary
		 */
		setDictionary: function() {
			_data.dictionary = [];
			if(_options.enabled.hb) _data.dictionary = _data.dictionary.concat(_dictionaries.hb);
			if(_options.enabled.hv) _data.dictionary = _data.dictionary.concat(_dictionaries.hv);
			if(_options.enabled.hc) _data.dictionary = _data.dictionary.concat(_dictionaries.hc);
			if(_options.enabled.kb) _data.dictionary = _data.dictionary.concat(_dictionaries.kb);
			if(_options.enabled.kv) _data.dictionary = _data.dictionary.concat(_dictionaries.kv);
			if(_options.enabled.kc) _data.dictionary = _data.dictionary.concat(_dictionaries.kc);
			if(_options.enabled.ke) _data.dictionary = _data.dictionary.concat(_dictionaries.ke);
		},

		/** 
		 * Set the character that will be quizzed on
		 */
		setQuestion: function() {
			var rand = Math.floor(Math.random()*_data.dictionary.length);
			_data.question = _data.dictionary[rand];
		},

		/** 
		 * Create the set of answers for multiple choice
		 */
		setAnswers: function() {
			var max = 4;
			var arr = [ _data.question ];
			while(arr.length < max) {
				var rand = Math.floor(Math.random()*_data.dictionary.length);
				if(_data.dictionary[rand] != _data.question) arr.push(_data.dictionary[rand]);
			}
			_data.answers = _private.shuffle(arr);
		},

		/** 
		 * Utility function for shuffling the array
		 */
		shuffle: function(array) {
		    var counter = array.length, temp, index;

		    // While there are elements in the array
		    while(counter > 0) {
		        // Pick a random index
		        index = Math.floor(Math.random() * counter);

		        // Decrease counter by 1
		        counter--;

		        // And swap the last element with it
		        temp = array[counter];
		        array[counter] = array[index];
		        array[index] = temp;
		    }

		    return array;
		}

	}


	var _public = {

		/** 
		 * Set mode
		 */
		setMode: function(mode) {
			_options.mode = (mode == 'jp_to_en') ? 'jp_to_en' : 'en_to_jp';
		},

		/**  
		 * Get the current quiz mode
		 */
		getMode: function() {
			return _options.mode;
		},

		/** 
		 * Get the question object
		 */
		getQuestion: function() { 
			_private.setQuestion();
			return _data.question;
		},

		/** 
		 * Get the answer objects
		 */
		getAnswers: function() {
			_private.setAnswers();
			return _data.answers;
		},

		/**
		 * Set enabled dictionaries
		 */
		setEnabledDictionaries: function(dicts) {
			for(dict in dicts) {
				_options.enabled[dict] = dicts[dict];
			}
			_private.setDictionary();
		},

		/** 
		 * Get the active dictinoaries
		 */
		getEnabledDictionaries: function() {
			return _options.enabled;
		},

		/** 
		 * Check an answer
		 */
		checkAnswer: function(answer) {
			return (_data.question.romaji == answer);
		}

	}

	return _private.init();

}