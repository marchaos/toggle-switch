var ToggleSwitch = function(eEl, sOnText, sOffText) 
{
	this.eEl = eEl;

	this.eTrack = document.createElement('div');
	this.eTrack.className = 'ts-track';
	this.eTrack.addEventListener('click', this.click.bind(this));

	this.eSwitch = document.createElement('span');
	this.eSwitch.className = 'ts-switch';

	this.eOnText = document.createElement('span');
	this.eOnText.className = 'ts-on-text';
	this.eOnText.innerText = sOnText;

	this.eOffText = document.createElement('span');
	this.eOffText.innerText = sOffText;
	this.eOffText.className = 'ts-off-text';

	this.eSwitchContainer = document.createElement('div');
	this.eSwitchContainer.className = 'ts-switch-container';
	this.eSwitchContainer.appendChild(this.eOnText);
	this.eSwitchContainer.appendChild(this.eSwitch);
	this.eSwitchContainer.appendChild(this.eOffText);

	this.eTrack.appendChild(this.eSwitchContainer);

	this.eSwitch.addEventListener('touchstart', this.touchStart.bind(this));
	this.eSwitch.addEventListener('touchend', this.touchEnd.bind(this));
	this.eSwitch.addEventListener('touchmove', this.touchMove.bind(this));

	document.body.appendChild(this.eTrack);

	this.eEl.parentNode.replaceChild(this.eTrack, this.eEl);
	this.eTrack.appendChild(this.eEl);
};

ToggleSwitch.prototype = 
{

	click: function(e)
	{
		this.toggleClass(this.eTrack, 'on');
	},

	touchStart: function() 
	{
		console.info('touchStart');
	},
	touchMove: function()
	{

	},
	touchEnd: function()
	{

	},
 	
	toggleClass: function(eEl, sClass)
	{
		(new RegExp('\\b' + sClass + '\\b').test(eEl.className)) 
			? this.removeClass(eEl, sClass) : this.addClass(eEl, sClass);
		return this;
	},

	replaceClass: function(eEl, sOldClass, sNewClass) 
	{
		this.removeClass(eEl, sOldClass).addClass(eEl, sNewClass);
	},

	removeClass: function(eEl, sClass)
	{
		eEl.className = eEl.className.replace(new RegExp('(\\b' + sClass + '\\b)'), '').trim();
		return this;
	},

	addClass: function(eEl, sClass)
	{
		this.removeClass(eEl, sClass);
		eEl.className += ' ' + sClass;
		return this;
	}
};