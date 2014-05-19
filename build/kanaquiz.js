/** @jsx React.DOM */



/* ======================================================== */
// Components
/* ======================================================== */

/** 
 * Kana Quiz component
 * wrapper for the entire quiz
 */
var KanaQuiz = React.createClass({displayName: 'KanaQuiz',

	kana: new Kana(),

	getInitialState: function() {
		var init = this.updateQuiz();
		init.message = { text: '&nbsp;', type: 'empty' }
		return init;
	},

	updateQuiz: function() {
		var state = {
			mode: this.kana.getMode(),
			question: this.kana.getQuestion(),
			answers: this.kana.getAnswers(),
			enabled: this.kana.getEnabledDictionaries(),
			showoptions: false,
			showoverlay: false
		}
		return state;	
	},

	updateOptions: function(options) {
		this.kana.setEnabledDictionaries(options);
		var state = this.updateQuiz();
		state.message = { text: 'Settings updated', 'type': 'info' }
		this.setState(state);
	},

	hideOptions: function() {
		this.setState({ showoptions: false, showoverlay: false });
	},

	showOptions: function() {
		this.setState({ showoptions: true, showoverlay: true });
	},

	setMode: function(e) {
		var newmode = e.target.value;
		var newmsg = { text: 'Switched modes', type: 'info' }
		this.kana.setMode(newmode);
		this.setState({ mode: newmode, message: newmsg });
	},

	checkAnswer: function(e) {
		var question = (this.state.mode == 'en_to_jp') ? this.state.question.romaji : this.state.question.kana;
		var answer = (this.state.mode == 'en_to_jp') ? this.state.question.kana : this.state.question.romaji;
		var choice = e.target.value;
		var message = (this.kana.checkAnswer(choice))
			? { text: question + ' = ' + answer + ' ... Man, you\'re pretty good at this!', type: 'good' }
			: { text: 'Ooooh, sorry ... ' + question + ' = ' + answer, type: 'bad' };
		var state = this.updateQuiz();
		state.message = message;
		this.setState(state);
	},

	render: function() {
		return (
			React.DOM.div( {id:"kanaquiz"}, 
				Overlay( {data:this.state} ),
				OptionsPanel( {data:this.state, updateOptions:this.updateOptions, hideOptions:this.hideOptions} ),
				Title( {data:this.state} ),
				Options( {data:this.state, setMode:this.setMode, showOptions:this.showOptions} ),
				Message( {data:this.state} ),
				Question( {data:this.state} ),
				Choices( {data:this.state, checkAnswer:this.checkAnswer} )
			)
		);
	}

});


/**
 * Title
 */
var Title = React.createClass({displayName: 'Title',

	render: function() {
		var title = (this.props.data.mode == 'jp_to_en')
			? 'かなクイズ'
			: 'Kana Quiz';
		return (
			React.DOM.h1( {className:"kanaquiz-title"}, title)
		);
	}

});


/** 
 * Options
 */
var Options = React.createClass({displayName: 'Options',

	render: function() {
		var mode = this.props.data.mode;
		return (
			React.DOM.div( {className:"kanaquiz-settings-bar"}, 
				React.DOM.input( {type:"radio", name:"kanaquiz-mode", id:"en_to_jp", value:"en_to_jp", className:"kanaquiz-mode en_to_jp", onChange:this.props.setMode, defaultChecked: (mode == 'en_to_jp') ? true : false} ),
				React.DOM.label( {htmlFor:"en_to_jp"}, "English to Japanese"),
				React.DOM.input( {type:"radio", name:"kanaquiz-mode", id:"jp_to_en", value:"jp_to_en", className:"kanaquiz-mode jp_to_en", onChange:this.props.setMode, defaultChecked: (mode == 'jp_to_en') ? true : false} ),
				React.DOM.label( {htmlFor:"jp_to_en"}, "Japanese to English"),

				React.DOM.a( {className:"kanaquiz-options-button", onClick:this.props.showOptions})
			)
		);
	}

});


/** 
 * Options panel
 */
var OptionsPanel = React.createClass({displayName: 'OptionsPanel',

	handleSubmit: function() {
		var options = {
			hb: this.refs.hb.state.checked,
			hv: this.refs.hv.state.checked,
			hc: this.refs.hc.state.checked,
			kb: this.refs.kb.state.checked,
			kv: this.refs.kv.state.checked,
			kc: this.refs.kc.state.checked,
			ke: this.refs.ke.state.checked
		}
		this.props.updateOptions(options);
		return false;
	},

	render: function() {
		var ret = (React.DOM.div(null));
		var enabled = this.props.data.enabled;
		if(this.props.data.showoptions) {
			ret = (
				React.DOM.form( {id:"kanaquiz-optionspanel", onSubmit:this.handleSubmit}, 
					React.DOM.h2( {id:"kanaquiz-optionstitle"}, "Settings"),
					React.DOM.div( {id:"kanaquiz-options"}, 
						React.DOM.fieldset(null, React.DOM.legend(null, "Hiragana"),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"hb", type:"checkbox", name:"dictionaries[]", id:"dictionary-hb", value:"hb", defaultChecked:enabled.hb ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-hb"}, "Hiragana Basic")
							),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"hv", type:"checkbox", name:"dictionaries[]", id:"dictionary-hv", value:"hv", defaultChecked:enabled.hv ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-hv"}, "Hiragana Voiced")
							),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"hc", type:"checkbox", name:"dictionaries[]", id:"dictionary-hc", value:"hc", defaultChecked:enabled.hc ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-hc"}, "Hiragana Contracted")
							)
						),
						React.DOM.fieldset(null, React.DOM.legend(null, "Katakana"),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"kb", type:"checkbox", name:"dictionaries[]", id:"dictionary-kb", value:"kb", defaultChecked:enabled.kb ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-kb"}, "Katakana Basic")
							),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"kv", type:"checkbox", name:"dictionaries[]", id:"dictionary-kv", value:"kv", defaultChecked:enabled.kv ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-kv"}, "Katakana Voiced")
							),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"kc", type:"checkbox", name:"dictionaries[]", id:"dictionary-kc", value:"kc", defaultChecked:enabled.kc ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-kc"}, "Katakana Contracted")
							),
							React.DOM.div( {className:"formrow"}, 
								React.DOM.input( {ref:"ke", type:"checkbox", name:"dictionaries[]", id:"dictionary-ke", value:"ke", defaultChecked:enabled.ke ? true : false } ),
								React.DOM.label( {htmlFor:"dictionary-ke"}, "Katakana Extended")
							)
						)
					),
					React.DOM.div( {id:"kanaquiz-optionsbuttons"}, 
						React.DOM.input( {type:"submit", className:"submit", value:"Submit"} ),
						React.DOM.a( {className:"cancel", onClick:this.props.hideOptions}, "Cancel")
					)
				)
			);
		}
		return ret;
	}

});



/** 
 * Overlay
 */
var Overlay = React.createClass({displayName: 'Overlay',

	render: function() {
		var ret = (React.DOM.div(null));
		if(this.props.data.showoverlay) {
			ret = (
				React.DOM.div( {className:"kanaquiz-overlay"})
			);
		}
		return ret;
	}

});



/** 
 * Messaging
 */
var Message = React.createClass({displayName: 'Message',

	render: function() {
		var msgtext = this.props.data.message.text;
		switch(this.props.data.message.type) {
			case 'good': var msgclass = 'msg-good'; break;
			case 'bad': var msgclass = 'msg-bad'; break;
			case 'warn': var msgclass = 'msg-warn'; break;
			case 'info': var msgclass = 'msg-info'; break;
			default: var msgclass = 'msg-empty'; break;
		}

		return (
			React.DOM.div( {className:msgclass}, msgtext)
		);
	}

});


/** 
 * Quiz question component
 * outputs the current character(s) being quizzed
 */
var Question = React.createClass({displayName: 'Question',

	render: function() {
		var question = this.props.data.question;
		var mode = this.props.data.mode;
		return (mode == 'jp_to_en')
			? (React.DOM.div( {className:"kana-question"}, question.kana))
			: (React.DOM.div( {className:"kana-question"}, question.romaji));
	}

});


/**
 * Quiz choices component
 */
var Choices = React.createClass({displayName: 'Choices',

	render: function() {
		var mode = this.props.data.mode;
		return (
			React.DOM.div( {className:"kana-choices"}, 
			this.props.data.answers.map(function(item, i) {
				return (mode == 'jp_to_en')
					? React.DOM.label( {className:"kana-choice", key:i}, React.DOM.input( {type:"radio", value:item.romaji, onChange:this.props.checkAnswer, name:"kana-choice"}),item.romaji)
					: React.DOM.label( {className:"kana-choice", key:i}, React.DOM.input( {type:"radio", value:item.romaji, onChange:this.props.checkAnswer, name:"kana-choice"}),item.kana);
			}, this)
			)
		);
	}

});


/* ======================================================== */
// Render
/* ======================================================== */
React.renderComponent(
	KanaQuiz(null )
	, document.getElementById('kanaquiz-wrapper')
);


