//=============================================================================
// Yanfly Engine Plugins - Message Core
// YEP_MessageCore.js - Traduccion Rekiem
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MessageCore = true;

var Yanfly = Yanfly || {};
Yanfly.Message = Yanfly.Message || {};

//=============================================================================
 /*:
 * @plugindesc Agrega mas caracteristicas a la ventana de mensajes para
 * personalizar la forma en que se ven mensajes y funciones.
 * @author Yanfly Engine Plugins - (es) v1.03
 *
 * @param ---General---
 * @default
 *
 * @param Default Rows
 * @desc Este es el numero predeterminado de lineas que el cuadro
 * de mensajes va a tener.  Por defecto: 4
 * @default 4
 *
 * @param Default Width
 * @desc Este es el ancho estandar para el cuadro de mensajes en
 * pixeles.  Por defecto: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Face Indent
 * @desc Si usa una face grafica, establece como el texto va ser
 * sangrado.  Por defecto: Window_Base._faceWidth + 24
 * @default Window_Base._faceWidth + 24
 *
 * @param Fast Forward
 * @desc Habilita un boton de avance rapido para avanzar hacia 
 * adelante. Si no desea esto, cambie a 'false' en su lugar.
 * @default Input.isPressed('pagedown')
 *
 * @param Word Wrapping
 * @desc Esta opcion activa o desactiva el cubrimiento de palabras
 * por defecto.   APAGADO - false    ENCENDIDO - true
 * @default false
 *
 * @param Description Wrap
 * @desc Esta opcion activa o desactiva el cubrimiento de palabras
 * para las descripciones. APAGADO - false   ENCENDIDO - true
 * @default false
 *
 * @param ---Font(Fuente)---
 * @default
 *
 * @param Font Name
 * @desc Esta es la fuente predeterminada utilizada para la ventana 
 * de mensajes.  Por defecto: GameFont
 * @default GameFont
 *
 * @param Font Size
 * @desc Este es el tamano de fuente predeterminada utilizada para 
 * la ventana de mensajes.  Por defecto: 28
 * @default 28
 *
 * @param Font Size Change
 * @desc Siempre que \{ e \} *[ English> \{ and \}]*  son usados, 
 * se ajustan por este valor.  Por defecto: 12
 * @default 12
 *
 * @param Font Changed Max
 * @desc Este es el tamano maximo alcanzado por \{.
 * Por defecto: 96
 * @default 96
 *
 * @param Font Changed Min
 * @desc Este es el tamano minimo alcanzado por \{.
 * Por defecto: 12
 * @default 12
 *
 * @param ---Name Box (Caja de Nombre)---
 * @default
 *
 * @param Name Box Buffer X
 * @desc Este es el buffer para la ubicacion X de la Caja de Nombre.
 * @default -28
 *
 * @param Name Box Buffer Y
 * @desc Este es el buffer para la ubicacion Y de la Caja de Nombre.
 * @default 0
 *
 * @param Name Box Padding
 * @desc Este es el valor para el padding de la Caja de Nombre.
 * @default this.standardPadding() * 4
 *
 * @param Name Box Color
 * @desc Este es el color del texto usado para la Caja de Nombre.
 * @default 0
 *
 * @param Name Box Clear
 * @desc Quieres que la ventana Caja de Nombre sea color claro?
 * NO - false     SI - true
 * @default false
 *
 * @param Name Box Added Text
 * @desc Este texto se agrega cada vez que Caja de Nombre es usada.
 * Se usa para establecer automaticamente los colores.
 * @default \c[6]
 *
 * @help
 * ============================================================================
 * Introduccion
 * ============================================================================
 *
 * Mientras que el RPG Maker MV Ace ciertamente improviso bastante el sistema 
 * de mensaje, no estaria mal agregar algunas caracteristicas mas, como  
 * ventana de nombres, convertir el codigo de textos para escribir los iconos 
 * y/o *[English > and/or]* los nombres de los items, armas, armaduras, y* de 
 * una manera mas rapida. Este script tambien da al desarrollador la 
 * habilidad de ajustar el tamano de la ventana de mensajes durante el juego,
 * asi como darle una fuente separada, y darle al jugador la caracteristica 
 * de poder realizar un avance rapido del texto.
 *
 * ============================================================================
 * Word Wrapping (Cubrimiento de Palabras)
 * ============================================================================
 *
 * Cubrir palabra ahora es posible a traves del sistema de mensajes. Puedes 
 * activar y desactivar Cubrir Palabra usando los comandos de Plugin. durante 
 * el uso de Cubrir Palabra, si la palabra se extiende mas alla del area de 
 * mensajes de la ventana, pasara automaticamente a la siguiente linea.
 * dicho esto, Cubrir palabra inhabilitara los saltos de linea del editor
 * y requerira que utilice los proporcionados por el plugin:
 *
 * <br> o <line break> es el codigo de texto para aplicar una rotura de linea.
 * Utilice esto antes o despues de la parte en la que desea iniciar una
 * nueva linea.
 *
 * Tenga en cuenta Cubrir palabra es sobre todo para las ventanas de mensajes.
 * sin embargo, en otros lugares donde quiera ver un ajuste de texto, tales
 * como la descripciones de los articulos, inserta <WordWrap>
 * en el comienzo del texto para activarlo.
 *
 * ============================================================================
 * Text Codes (Codigo de Textos)
 * ============================================================================
 *
 * En el uso de ciertos codigos de textos en tus mensajes, Usted puede hacer 
 * que el juego los sustituya con los siguientes:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Codigo de Texto    Funcion
 *   \V[n]       Reemplaza por el valor de la variable n-th.
 *   \N[n]       Reemplaza por el nombre del actor n-th.
 *   \P[n]       Reemplaza por el nombre del miembro del grupo n-th.
 *   \G          Reemplaza por la unidad monetaria.
 *   \C[n]       Dibujar el siguiente texto de color n-th.
 *   \I[n]       Dibujar el icono n-th.
 *   \{          Aumenta el tamano del texto en un paso.
 *   \}          Reduce el tamano del texto en un paso.
 *   \\          Reemplaza con el caracter de barra invertida.
 *   \$          Abre la ventana de oro.
 *   \.          Espera 1/4th de segundo.
 *   \|          Espera 1 un segundo.
 *   \!          Espera la entrada de boton.
 *   \>          Visualizar todo el resto del texto en la misma linea a la vez.
 *   \<          Cancela el efecto que muestra el texto a la vez.
 *   \^          No espera la entrada de datos despues de visualizar el texto.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Esperar:    Efecto:
 *    \w[x]     - Espera x frames (60 frames = 1 segundo).
 *	    Solo ventana de mensaje.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Nombre de Ventana:  	    Efecto:
 *    \n<x>     - Crea una caja de nombre con x string. Lado izquierdo. *Nota
 *    \nc<x>    - Crea una caja de nombre con x string. Centrado. *Nota
 *    \nr<x>    - Crea una caja de nombre con x string. Lado derecho. *Nota
 *
 *              *Nota: Solo funciona para la ventana de mensajes.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Salto de linea  		Efecto:
 *    <br>     - Si utiliza el modo de ajuste de linea,
 *               esto provocara un salto de linea.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Posicion:   Efecto:
 *    \px[x]    - Establece posicion X para el texto X.
 *    \py[x]    - Establece posicion Y para el texto Y.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Esquema:    Efecto:
 *   \oc[x]    - Establece el color del esquema a X.
 *   \ow[x]    - Establece el largo del esquema a X.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Fuente:     Efecto:
 *    \fr       - Restablece todos los cambios de fuente.
 *    \fs[x]    - Cambia el tamano de fuente a X.
 *    \fn<x>    - Cambia nombre de la fuente a X.
 *    \fb       - Cambia la fuente a bold.
 *    \fi       - Cambia la fuente a italic.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Actor:      Efecto:
 *    \af[x]    - Muestra la cara del personaje x. *Nota
 *    \ac[x]    - Escribe el nombre de la clase del personaje.
 *    \an[x]    - Escribe el apodo del personaje.
 *
 *              *Nota: Funciona solo para la ventana de mensaje.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Grupo:      Efecto:
 *    \pf[x]    - Muestra la cara del miembro x del grupo. *Nota
 *    \pc[x]    - Escribe el nombre de la clase del personaje x del grupo.
 *    \pn[x]    - Escribe el apodo del personaje x del grupo.
 *
 *              *Nota: Funciona solo para la ventana de mensaje.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Nombres:      Efecto:
 *    \nc[x]    - Escribe el nombre de la clase x.
 *    \ni[x]    - Escribe el nombre del articulo x.
 *    \nw[x]    - Escribe el nombre de la arma x.
 *    \na[x]    - Escribe el nombre de la armadura x.
 *    \ns[x]    - Escribe el nombre de la habilidad x.
 *    \nt[x]    - Escribe el nombre del estado x.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Nombre de Iconos:         Efecto:
 *    \ii[x]    - Escribe el nombre del articulo x incluido el icono.
 *    \iw[x]    - Escribe el nombre de la arma x incluido el icono.
 *    \ia[x]    - Escribe el nombre de la armadura x incluido el icono.
 *    \is[x]    - Escribe el nombre de la habilidad x incluido el icono.
 *    \it[x]    - Escribe el nombre del estado x incluido el icono.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Y estos son los codigos de texto agregados en este script. tenga en mente 
 * que algunas clases de codigo de texto solo funcionan para la ventana 
 * de mensajes. De lo contrario, trabaja para la descripciones de ayuda,
 * biografias de personaje, y otros.
 *
 * ============================================================================
 * Comandos de Plugin
 * ============================================================================
 *
 * Los siguientes son unos comandos de plugin que usted puede usar a traves del
 * editor de eventos para cambiar varios aspectos sobre el sistema de mensaje.
 *
 * Comando de plugin
 *   MessageRows 6          = Cambia las lineas de mensajes mostradas a 6. 
 *                            Si estas usando continuamente eventos de 
 *                            Mostrar Texto, esto continuara mostrando los 
 *                            siguientes textos de lineas hasta llegar al
 *                            limite de linea. Cualquier cosa despues de eso
 *                            es cortada hasta el siguiente mensaje comenzar,
 *                            para evitar un superposicion por accidente.
 *
 *   MessageWidth 400       = Cambia el ancho de la ventana de mensajes a 400px.
 *                            Esto cortara cualquier palabra que se muestra 
 *                            demasiado a la derecha por lo que se ajustara 
 *                            en consecuencia!
 *
 *   EnableWordWrap         = Activa ajuste de texto. Si una palabra se 
 *                            extiende mas alla del tamano de la ventana, 
 *                            se movera automaticamente a la siguiente linea.
 *                            Tenga en cuenta, usted necesitara usar \br
 *                            para realizar saltos de linea.
 *
 *   DisableWordWrap        = Esto desactiva el ajuste de texto. Los saltos de 
 *                            linea seran automaticos en los puntos donde se 
 *                            inicie una nueva linea  en el editor.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03a:
 * - Timed Name Window's closing speed with main window's closing speed.
 *
 * Verison 1.03:
 * - Fixed a bug with textcodes that messed up wordwrapping.
 * - Fixed a bug with font reset, italic, and bold textcodes.
 *
 * Version 1.02:
 * - Namebox Window's overlap feature that's in every MV window is now disabled
 * to allow for overlapping with main message window.
 * - Updated window positioning for Branch Choices, Number Input, and Item
 * Selection windows.
 *
 * Version 1.01:
 * - Added 'Description Wrap' into the parameters to allow for all item
 * descriptions to be automatically processed with word wrapping.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MessageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSGDefaultRows = String(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSGDefaultWidth = String(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSGFaceIndent = String(Yanfly.Parameters['Face Indent']);
Yanfly.Param.MSGFastForward = String(Yanfly.Parameters['Fast Forward']);
Yanfly.Param.MSGWordWrap = String(Yanfly.Parameters['Word Wrapping']);
Yanfly.Param.MSGDescWrap = String(Yanfly.Parameters['Description Wrap']);
Yanfly.Param.MSGFontName = String(Yanfly.Parameters['Font Name']);
Yanfly.Param.MSGFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MSGFontSizeChange = String(Yanfly.Parameters['Font Size Change']);
Yanfly.Param.MSGFontChangeMax = String(Yanfly.Parameters['Font Changed Max']);
Yanfly.Param.MSGFontChangeMin = String(Yanfly.Parameters['Font Changed Min']);
Yanfly.Param.MSGNameBoxBufferX = String(Yanfly.Parameters['Name Box Buffer X']);
Yanfly.Param.MSGNameBoxBufferY = String(Yanfly.Parameters['Name Box Buffer Y']);
Yanfly.Param.MSGNameBoxPadding = String(Yanfly.Parameters['Name Box Padding']);
Yanfly.Param.MSGNameBoxColor = Number(Yanfly.Parameters['Name Box Color']);
Yanfly.Param.MSGNameBoxClear = String(Yanfly.Parameters['Name Box Clear']);
Yanfly.Param.MSGNameBoxText = String(Yanfly.Parameters['Name Box Added Text']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Message.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
		Yanfly.Message.Bitmap_initialize.call(this, width, height);
		this.fontBold = false;
};

Yanfly.Message.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
    if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
		return Yanfly.Message.Bitmap_makeFontNameText.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Message.Game_System_initialize =	Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
		Yanfly.Message.Game_System_initialize.call(this);
		this.initMessageSystem();
};

Game_System.prototype.initMessageSystem = function() {
		this._wordWrap = eval(Yanfly.Param.MSGWordWrap);
};

Game_System.prototype.messageRows = function() {
		var rows = eval(this._messageRows) || eval(Yanfly.Param.MSGDefaultRows);
		return Math.max(1, parseInt(rows));
};

Game_System.prototype.messageWidth = function() {
		return eval(this._messageWidth) || eval(Yanfly.Param.MSGDefaultWidth);
};

Game_System.prototype.wordWrap = function() {
		if (this._wordWrap === undefined) this.initMessageSystem();
		return this._wordWrap;
};

Game_System.prototype.setWordWrap = function(state) {
		if (this._wordWrap === undefined) this.initMessageSystem();
		this._wordWrap = state;
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.addText = function(text) {
		if ($gameSystem.wordWrap()) text = '<WordWrap>' + text;
		this.add(text);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Message.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Message.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MessageRows') $gameSystem._messageRows = args[0];
		if (command === 'MessageWidth') $gameSystem._messageWidth = args[0];
		if (command === 'EnableWordWrap') $gameSystem.setWordWrap(true);
		if (command === 'DisableWordWrap') $gameSystem.setWordWrap(false);
};

Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
			while (this.isContinueMessageString()) {
        this._index++;
				if (this._list[this._index].code === 401) {
					$gameMessage.addText(this.currentCommand().parameters[0]);
				}
				if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
      }
      switch (this.nextEventCode()) {
      case 102:
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
      case 103:
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
      case 104:
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
};

Game_Interpreter.prototype.isContinueMessageString = function() {
		if (this.nextEventCode() === 101 && $gameSystem.messageRows() > 4) {
			return true;
		} else {
			return this.nextEventCode() === 401;
		}
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Message.Window_Base_resetFontSettings =
		Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    Yanfly.Message.Window_Base_resetFontSettings.call(this);
		this.contents.fontBold = false;
		this.contents.fontItalic = false;
		this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
		this.contents.outlineWidth = 4;
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Yanfly.Message.Window_Base_convertEscapeCharacters =
		Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = this.setWordWrap(text);
		text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
		text = this.convertExtraEscapeCharacters(text);
		return text;
};

Window_Base.prototype.setWordWrap = function(text) {
		this._wordWrap = false;
		if (text.match(/<(?:WordWrap)>/i)) {
			this._wordWrap = true;
			text = text.replace(/<(?:WordWrap)>/gi, '\n');
		}
		if (this._wordWrap) {
			text = text.replace(/[\n\r]+/g, '');
			text = text.replace(/<(?:BR|line break)>/gi, '\n');
		}
		return text;
};

Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
		// Font Codes
		text = text.replace(/\x1bFR/gi, '\x1bMSGCORE[0]');
		text = text.replace(/\x1bFB/gi, '\x1bMSGCORE[1]');
		text = text.replace(/\x1bFI/gi, '\x1bMSGCORE[2]');
		// \AC[n]
		text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
				return this.actorClassName(parseInt(arguments[1]));
		}.bind(this));
		// \AN[n]
		text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
				return this.actorNickname(parseInt(arguments[1]));
		}.bind(this));
		// \PC[n]
		text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
				return this.partyClassName(parseInt(arguments[1]));
		}.bind(this));
		// \PN[n]
		text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
				return this.partyNickname(parseInt(arguments[1]));
		}.bind(this));
		// \NC[n]
		text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
				return $dataClasses[parseInt(arguments[1])].name;
		}.bind(this));
		// \NI[n]
		text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
				return $dataItems[parseInt(arguments[1])].name;
		}.bind(this));
		// \NW[n]
		text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
				return $dataWeapons[parseInt(arguments[1])].name;
		}.bind(this));
		// \NA[n]
		text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
				return $dataArmors[parseInt(arguments[1])].name;
		}.bind(this));
		// \NE[n]
		text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
				return $dataEnemies[parseInt(arguments[1])].name;
		}.bind(this));
		// \NS[n]
		text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
				return $dataSkills[parseInt(arguments[1])].name;
		}.bind(this));
		// \NT[n]
		text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
				return $dataStates[parseInt(arguments[1])].name;
		}.bind(this));
		// \II[n]
		text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataItems);
		}.bind(this));
		// \IW[n]
		text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataWeapons);
		}.bind(this));
		// \IA[n]
		text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataArmors);
		}.bind(this));
		// \IS[n]
		text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataSkills);
		}.bind(this));
		// \IT[n]
		text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataStates);
		}.bind(this));
		// Finish
    return text;
};

Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.partyNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.escapeIconItem = function(n, database) {
		return '\x1bI[' + database[n].iconIndex + ']' + database[n].name;
};

Window_Base.prototype.obtainEscapeString = function(textState) {
    var arr = /^\<(.*)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '';
    }
};

Yanfly.Message.Window_Base_processEscapeCharacter =
		Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		switch (code) {
		case 'MSGCORE':
				var id = this.obtainEscapeParam(textState);
				if (id === 0) this.resetFontSettings();
				if (id === 1) this.contents.fontBold = !this.contents.fontBold;
				if (id === 2) this.contents.fontItalic = !this.contents.fontItalic;
				break;
		case 'FS':
        this.contents.fontSize = this.obtainEscapeParam(textState);
        break;
    case 'FN':
				var name = this.obtainEscapeString(textState);
				this.contents.fontFace = name;
        break;
		case 'OC':
				var id = this.obtainEscapeParam(textState);
        this.contents.outlineColor = this.textColor(id);
        break;
		case 'OW':
				this.contents.outlineWidth = this.obtainEscapeParam(textState);
        break;
    case 'PX':
        textState.x = this.obtainEscapeParam(textState);
        break;
    case 'PY':
        textState.y = this.obtainEscapeParam(textState);
        break;
        break;
		default:
      Yanfly.Message.Window_Base_processEscapeCharacter.call(this,
				code, textState);
      break;
    }
};

Window_Base.prototype.makeFontBigger = function() {
		var size = this.contents.fontSize + eval(Yanfly.Param.MSGFontSizeChange);
		this.contents.fontSize = Math.min(size, Yanfly.Param.MSGFontChangeMax);
};

Window_Base.prototype.makeFontSmaller = function() {
	var size = this.contents.fontSize - eval(Yanfly.Param.MSGFontSizeChange);
	this.contents.fontSize = Math.max(size, Yanfly.Param.MSGFontChangeMin);
};

Yanfly.Message.Window_Base_processNormalCharacter =
		Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
		if (this.checkWordWrap(textState)) return this.processNewLine(textState);
		Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
		if (!textState) return false;
		if (!this._wordWrap) return false;
		if (textState.text[textState.index] === ' ') {
			var nextSpace = textState.text.indexOf(' ', textState.index + 1);
			var nextBreak = textState.text.indexOf('\n', textState.index + 1);
			if (nextSpace < 0) nextSpace = textState.text.length + 1;
			if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
			var word = textState.text.substring(textState.index, nextSpace);
			var size = this.textWidthExCheck(word);
		}
		return (size + textState.x > this.contents.width);
};

Window_Base.prototype.saveCurrentWindowSettings = function(){
		this._saveFontFace = this.contents.fontFace;
		this._saveFontSize = this.contents.fontSize;
		this._savetextColor = this.contents.textColor;
		this._saveFontBold = this.contents.fontBold;
		this._saveFontItalic = this.contents.fontItalic;
		this._saveOutlineColor = this.contents.outlineColor;
		this._saveOutlineWidth = this.contents.outlineWidth;
};

Window_Base.prototype.restoreCurrentWindowSettings = function(){
		this.contents.fontFace = this._saveFontFace;
		this.contents.fontSize = this._saveFontSize;
		this.contents.textColor = this._savetextColor;
		this.contents.fontBold = this._saveFontBold;
		this.contents.fontItalic = this._saveFontItalic;
		this.contents.outlineColor = this._saveOutlineColor;
		this.contents.outlineWidth = this._saveOutlineWidth;
};

Window_Base.prototype.clearCurrentWindowSettings = function(){
		this._saveFontFace = undefined;
		this._saveFontSize = undefined;
		this._savetextColor = undefined;
		this._saveFontBold = undefined;
		this._saveFontItalic = undefined;
		this._saveOutlineColor = undefined;
		this._saveOutlineWidth = undefined;
};

Window_Base.prototype.textWidthExCheck = function(text) {
		var setting = this._wordWrap;
		this._wordWrap = false;
		this.saveCurrentWindowSettings();
		this._checkWordWrapMode = true;
		var value = this.drawTextEx(text, 0, this.contents.height);
		this._checkWordWrapMode = false;
		this.restoreCurrentWindowSettings();
		this.clearCurrentWindowSettings();
		this._wordWrap = setting;
		return value;
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.Message.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
		if (eval(Yanfly.Param.MSGDescWrap)) {
			this.setText(item ? '<WordWrap>' + item.description : '');
		} else {
			Yanfly.Message.Window_Help_setItem.call(this, item);
		}
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_ChoiceList.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Yanfly.Message.Window_ChoiceList_updatePlacement =
		Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
		Yanfly.Message.Window_ChoiceList_updatePlacement.call(this);
		var messagePosType = $gameMessage.positionType();
		if (messagePosType === 0) {
			this.y = this._messageWindow.height;
		} else if (messagePosType === 2) {
			this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
		}
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.Message.Window_NumberInput_updatePlacement =
		Window_NumberInput.prototype.updatePlacement;
Window_NumberInput.prototype.updatePlacement = function() {
    Yanfly.Message.Window_NumberInput_updatePlacement.call(this);
		var messagePosType = $gameMessage.positionType();
		if (messagePosType === 0) {
			this.y = this._messageWindow.height;
		} else if (messagePosType === 1) {
			if (messageY >= Graphics.boxHeight / 2) {
					this.y = messageY - this.height;
			} else {
					this.y = messageY + this._messageWindow.height;
			}
		} else if (messagePosType === 2) {
			this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
		}
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.Message.Window_EventItem_updatePlacement =
		Window_EventItem.prototype.updatePlacement;
Window_EventItem.prototype.updatePlacement = function() {
    Yanfly.Message.Window_EventItem_updatePlacement.call(this);
		var messagePosType = $gameMessage.positionType();
		if (messagePosType === 0) {
			this.y = Graphics.boxHeight - this.height;
		} else if (messagePosType === 2) {
			this.y = 0;
		}
};

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_ScrollText.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

//=============================================================================
// Window_NameBox
//=============================================================================

Yanfly.DisableWebGLMask = false;

function Window_NameBox() {
    this.initialize.apply(this, arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function(parentWindow) {
    this._parentWindow = parentWindow;
		this._ignoreMask = true
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
		this._text = '';
		this._openness = 0;
		this._closeCounter = 0;
		this.deactivate();
		if (eval(Yanfly.Param.MSGNameBoxClear)) {
			this.backOpacity = 0;
			this.opacity = 0;
		}
};

Yanfly.Message.WindowLayer_webglMaskWindow =
		WindowLayer.prototype._webglMaskWindow;
WindowLayer.prototype._webglMaskWindow = function(renderSession, win) {
    if (win._ignoreMask) return;
    Yanfly.Message.WindowLayer_webglMaskWindow.call(this, renderSession, win);
};

Window_NameBox.prototype.windowWidth = function() {
		this.resetFontSettings();
    var dw = this.textWidthEx(this._text);
		dw += this.padding * 2;
		return dw + eval(Yanfly.Param.MSGNameBoxPadding);
};

Window_NameBox.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_NameBox.prototype.calcNormalCharacter = function(textState) {
    return this.textWidth(textState.text[textState.index++]);
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_NameBox.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Window_NameBox.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) return;
		if (this.isClosed()) return;
		if (this.isClosing()) return;
		if (this._closeCounter-- > 0) return;
		if (this._parentWindow.isClosing()) {
			this._openness = this._parentWindow.openness;
		}
		this.close();
};

Window_NameBox.prototype.refresh = function(text, position) {
		this._text = Yanfly.Param.MSGNameBoxText + text;
		this._position = position;
		this.width = this.windowWidth();
		this.createContents();
		this.contents.clear();
		this.resetFontSettings();
		this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
		var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
		this.drawTextEx(this._text, padding, 0, this.contents.width);
		this._parentWindow.adjustWindowSettings();
		this._parentWindow.updatePlacement();
		this.adjustPositionX();
		this.adjustPositionY();
		this.open();
		this.activate();
		this._closeCounter = 4;
		return '';
};

Window_NameBox.prototype.adjustPositionX = function() {
    if (this._position === 1) {
			this.x = this._parentWindow.x;
			this.x += eval(Yanfly.Param.MSGNameBoxBufferX);
		} else if (this._position === 2) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width * 3 / 10;
			this.x -= this.width / 2;
		} else if (this._position === 3) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width / 2;
			this.x -= this.width / 2;
		} else if (this._position === 4) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width * 7 / 10;
			this.x -= this.width / 2;
		} else {
			this.x = this._parentWindow.x + this._parentWindow.width;
			this.x -= this.width;
			this.x -= eval(Yanfly.Param.MSGNameBoxBufferX);
		}
		this.x = this.x.clamp(0, Graphics.boxWidth - this.width);
};

Window_NameBox.prototype.adjustPositionY = function() {
		if ($gameMessage.positionType() === 0) {
			this.y = this._parentWindow.y + this._parentWindow.height;
			this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
		} else {
			this.y = this._parentWindow.y;
			this.y -= this.height;
			this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
		}
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.Message.Window_Message_subWindows = Window_Message.prototype.subWindows;
Window_Message.prototype.subWindows = function() {
    var subWindows = Yanfly.Message.Window_Message_subWindows.call(this);
		subWindows = subWindows.concat([this._nameWindow]);
		return subWindows;
};

Yanfly.Message.Window_Message_createSubWindows =
		Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    Yanfly.Message.Window_Message_createSubWindows.call(this);
		this._nameWindow = new Window_NameBox(this);
		Yanfly.nameWindow = this._nameWindow;
};

Window_Message.prototype.numVisibleRows = function() {
		return $gameSystem.messageRows();
};

Window_Message.prototype.windowWidth = function() {
    return $gameSystem.messageWidth();
};

Window_Message.prototype.adjustWindowSettings = function() {
		this.width = this.windowWidth();
		this.height = Math.min(this.windowHeight(), Graphics.boxHeight);
		if (Math.abs(Graphics.boxHeight - this.height) < this.lineHeight()) {
			this.height = Graphics.boxHeight;
		}
		this.createContents();
		this.x = (Graphics.boxWidth - this.width) / 2;
};

Yanfly.Message.Window_Message_startMessage =
		Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._nameWindow.deactivate();
		Yanfly.Message.Window_Message_startMessage.call(this);
};

Yanfly.Message.Window_Message_terminateMessage =
		Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.deactivate();
		Yanfly.Message.Window_Message_terminateMessage.call(this);
};

Yanfly.Message.Window_Message_newPage =
		Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this.adjustWindowSettings();
		Yanfly.Message.Window_Message_newPage.call(this, textState);
};

Window_Message.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_Message.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Window_Message.prototype.newLineX = function() {
    if ($gameMessage.faceName() === '') {
			return 0;
		} else {
			return eval(Yanfly.Param.MSGFaceIndent);
		}
};

Window_Message.prototype.isFastForward = function() {
		return eval(Yanfly.Param.MSGFastForward);
};

Yanfly.Message.Window_Message_updateInput =
		Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
			if (!this._textState) {
				this.pause = false;
				this.terminateMessage();
			}
		}
		return Yanfly.Message.Window_Message_updateInput.call(this);
};

Yanfly.Message.Window_Message_updateShowFast =
		Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (this.isFastForward()) this._showFast = true;
		Yanfly.Message.Window_Message_updateShowFast.call(this);
};

Yanfly.Message.Window_Message_updateWait =
		Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (this.isFastForward()) return false;
		return Yanfly.Message.Window_Message_updateWait.call(this);
};

Yanfly.Message.Window_Message_startWait =
		Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
		if (this._checkWordWrapMode) return;
		Yanfly.Message.Window_Message_startWait.call(this, count);
		if (this.isFastForward()) this._waitCount = 0;
};

Yanfly.Message.Window_Message_startPause =
		Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
		if (this._checkWordWrapMode) return;
		Yanfly.Message.Window_Message_startPause.call(this);
};

Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
		text = this.convertNameBox(text);
		text = this.convertMessageCharacters(text);
    return text;
};

Window_Message.prototype.convertNameBox = function(text) {
		text = text.replace(/\x1bN\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 1);
		}, this);
		text = text.replace(/\x1bN1\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 1);
		}, this);
		text = text.replace(/\x1bN2\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 2);
		}, this);
		text = text.replace(/\x1bN3\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 3);
		}, this);
		text = text.replace(/\x1bNC\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 3);
		}, this);
		text = text.replace(/\x1bN4\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 4);
		}, this);
		text = text.replace(/\x1bN5\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 5);
		}, this);
		text = text.replace(/\x1bNR\<(.*)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 5);
		}, this);
    return text;
};

Window_Message.prototype.convertMessageCharacters = function(text) {
		text = text.replace(/\x1bAF\[(\d+)\]/gi, function() {
				var i = parseInt(arguments[1])
				return this.convertActorFace($gameActors.actor(i));
		}.bind(this));
		text = text.replace(/\x1bPF\[(\d+)\]/gi, function() {
				var i = parseInt(arguments[1])
				return this.convertActorFace($gameParty.members()[i - 1]);
		}.bind(this));
    return text;
};

Window_Message.prototype.convertActorFace = function(actor) {
		$gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

Yanfly.Message.Window_Message_processEscapeCharacter =
		Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '!':
			if (!this.isFastForward()) this.startPause();
      break;
		case 'W':
			this.startWait(this.obtainEscapeParam(textState));
    default:
      Yanfly.Message.Window_Message_processEscapeCharacter.call(this,
				code, textState);
      break;
    }
};

//=============================================================================
// End of File
//=============================================================================
