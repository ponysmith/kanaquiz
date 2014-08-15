/** @jsx React.DOM */



/* ======================================================== */
// Components
/* ======================================================== */

/** 
 * Kana Quiz component
 * wrapper for the entire quiz
 */
var KanaQuiz = React.createClass({

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
			<div id="kanaquiz">
				<Overlay data={this.state} />
				<OptionsPanel data={this.state} updateOptions={this.updateOptions} hideOptions={this.hideOptions} />
				<Title data={this.state} />
				<Options data={this.state} setMode={this.setMode} showOptions={this.showOptions} />
				<Message data={this.state} />
				<Question data={this.state} />
				<Choices data={this.state} checkAnswer={this.checkAnswer} />
			</div>
		);
	}

});


/**
 * Title
 */
var Title = React.createClass({

	render: function() {
		var title = (this.props.data.mode == 'jp_to_en')
			? 'かなクイズ'
			: 'Kana Quiz';
		return (
			<h1 className="kanaquiz-title">{title}</h1>
		);
	}

});


/** 
 * Options
 */
var Options = React.createClass({

	render: function() {
		var mode = this.props.data.mode;
		return (
			<div className="kanaquiz-settings-bar">
				<input type="radio" name="kanaquiz-mode" id="en_to_jp" value="en_to_jp" className="kanaquiz-mode en_to_jp" onChange={this.props.setMode} defaultChecked={ (mode == 'en_to_jp') ? true : false} />
				<label htmlFor="en_to_jp">English to Japanese</label>
				<input type="radio" name="kanaquiz-mode" id="jp_to_en" value="jp_to_en" className="kanaquiz-mode jp_to_en" onChange={this.props.setMode} defaultChecked={ (mode == 'jp_to_en') ? true : false} />
				<label htmlFor="jp_to_en">Japanese to English</label>

				<a className="kanaquiz-options-button" onClick={this.props.showOptions}></a>
			</div>
		);
	}

});


/** 
 * Options panel
 */
var OptionsPanel = React.createClass({

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
		var ret = (<div></div>);
		var enabled = this.props.data.enabled;
		if(this.props.data.showoptions) {
			ret = (
				<form id="kanaquiz-optionspanel" onSubmit={this.handleSubmit}>
					<h2 id="kanaquiz-optionstitle">Settings</h2>
					<div id="kanaquiz-options">
						<fieldset><legend>Hiragana</legend>
							<div className="formrow">
								<input ref="hb" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-hb" value="hb" defaultChecked={enabled.hb ? true : false } />
								<label htmlFor="dictionary-hb">Hiragana Basic</label>
							</div>
							<div className="formrow">
								<input ref="hv" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-hv" value="hv" defaultChecked={enabled.hv ? true : false } />
								<label htmlFor="dictionary-hv">Hiragana Voiced</label>
							</div>
							<div className="formrow">
								<input ref="hc" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-hc" value="hc" defaultChecked={enabled.hc ? true : false } />
								<label htmlFor="dictionary-hc">Hiragana Contracted</label>
							</div>
						</fieldset>
						<fieldset><legend>Katakana</legend>
							<div className="formrow">
								<input ref="kb" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-kb" value="kb" defaultChecked={enabled.kb ? true : false } />
								<label htmlFor="dictionary-kb">Katakana Basic</label>
							</div>
							<div className="formrow">
								<input ref="kv" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-kv" value="kv" defaultChecked={enabled.kv ? true : false } />
								<label htmlFor="dictionary-kv">Katakana Voiced</label>
							</div>
							<div className="formrow">
								<input ref="kc" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-kc" value="kc" defaultChecked={enabled.kc ? true : false } />
								<label htmlFor="dictionary-kc">Katakana Contracted</label>
							</div>
							<div className="formrow">
								<input ref="ke" type="checkbox" className="lightswitch" name="dictionaries[]" id="dictionary-ke" value="ke" defaultChecked={enabled.ke ? true : false } />
								<label htmlFor="dictionary-ke">Katakana Extended</label>
							</div>
						</fieldset>
					</div>
					<div id="kanaquiz-optionsbuttons">
						<input type="submit" className="submit" value="Submit" />
						<a className="cancel" onClick={this.props.hideOptions}>Cancel</a>
					</div>
				</form>
			);
		}
		return ret;
	}

});



/** 
 * Overlay
 */
var Overlay = React.createClass({

	render: function() {
		var ret = (<div></div>);
		if(this.props.data.showoverlay) {
			ret = (
				<div className="kanaquiz-overlay"></div>
			);
		}
		return ret;
	}

});



/** 
 * Messaging
 */
var Message = React.createClass({

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
			<div className={msgclass}>{msgtext}</div>
		);
	}

});


/** 
 * Quiz question component
 * outputs the current character(s) being quizzed
 */
var Question = React.createClass({

	render: function() {
		var question = this.props.data.question;
		var mode = this.props.data.mode;
		return (mode == 'jp_to_en')
			? (<div className="kana-question">{question.kana}</div>)
			: (<div className="kana-question">{question.romaji}</div>);
	}

});


/**
 * Quiz choices component
 */
var Choices = React.createClass({

	render: function() {
		var mode = this.props.data.mode;
		return (
			<div className="kana-choices">
			{this.props.data.answers.map(function(item, i) {
				return (mode == 'jp_to_en')
					? <label className="kana-choice" key={i}><input type="radio" value={item.romaji} onChange={this.props.checkAnswer} name="kana-choice"/>{item.romaji}</label>
					: <label className="kana-choice" key={i}><input type="radio" value={item.romaji} onChange={this.props.checkAnswer} name="kana-choice"/>{item.kana}</label>;
			}, this)}
			</div>
		);
	}

});


/* ======================================================== */
// Render
/* ======================================================== */
React.renderComponent(
	<KanaQuiz />
	, document.getElementById('kanaquiz-wrapper')
);


