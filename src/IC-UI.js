/* Copyright © Imesh Chamara 2019 */
'use strict';
import '../icApp/icApp.js'
import {IAR_CE, IAR_EP} from '../icApp/icApp-render.js'
const icApp = ic.icApp
var inputUI = a => (
	{t: 'div', cl: 'inputui', s: a.s, ch: [
		{t:'label', at: [['for', a.id]], txt: a.name},
		{t: a.multi ? 'textarea' : 'input', at: [['readonly', a.readonly], ['type', a.type], ['type', a.id], ['id', a.id]], e: [...[a.multi ? ['onkeyup', inputUI.resize ]: []], ['onfocus', inputUI.check], ['onblur', inputUI.check], ['onchange', inputUI.check], ['oninput', inputUI.check]]}
]})
inputUI.check = a => new icApp.e(a = a.target).p[icApp.d.activeElement == a || a.value != '' ? 'cla' : 'clr']('s1')
inputUI.checkAll = a => {
	icApp.qsa('.inputui:not(.no) input').forEach(a=> inputUI.check({target: a}))
	icApp.qsa('.inputui:not(.no) textarea').forEach(a=> {
		inputUI.check({target: a})
		inputUI.resize({target: a})
	})
}
inputUI.resize = e => {
  (e = e.target).style.height = '2px'
  e.style.height = 4 + e.scrollHeight + 'px'
}
var dialogUI = a => (
	{t: 'div', cl: ['dialog-container', 'show'], at: [['id', 'ic-dialog-' + a.id]], ch: [
		{t: 'div', cl: 'dialog', ch: [
			{t: 'span', cl: 'c1', txt: a.name },
			{t: 'span', cl: 'c2', txt: a.msg },
			{t: 'div', ch: a.but.map((b, c) => ({t:'button', txt: b, cl: (c == 0 ? 'c1' : undefined), e: [['onclick',d => a.f({i:a.id, txt: b, b: c, e: d})]]})) }
		]}
	]}
)
dialogUI.i = 0
dialogUI.create = a => ([new icApp.e('#root').ap(IAR_CE(dialogUI(a = Object.assign(a, {id: dialogUI.i++})))[IAR_EP].e.v), a.id])[1]
dialogUI.remove = a => (a = icApp.qs('#ic-dialog-' + a)) ? a.remove() : 0

export {inputUI, dialogUI}
