var app = {
	initialize : function() {
		this.bindEvents();
	},
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},
	receivedEvent : function(id) {
		/* EJEMPLO DE COMO UTILIZAR EL PLUGIN */
		
		// Recepción de eventos del plugin
		SipManagerPlugin.listener = {
			onConnecting: function() { // Registrandose con el servidor SIP
				alert('onConnecting');
			},
			onConnectionSuccess: function() { // La registracion fue exitosa
				alert('onConnectionSuccess');
			},
			onConnectionFailed: function() { // La registracion fallo
				alert('onConnectionFailed');
			},
			onCallEstablished: function() { // La llamada ha sido establecida correctamente
				alert('onCallEstablished');
			},
			onCallEnded: function() { // La llamada ha sido finalizada
				alert('onCallEnded');
			},
			onIncomingCall: function(callerId) { // Hay una llamada entrante
				alert('onIncomingCall: ' + callerId);
			}
		};

		SipManagerPlugin.init(); // Inicialización del plugin

		$('#connect').on('click', function() {

			var domain = prompt('Domain', 'iptel.org');
			if (!domain || domain == '') {
				return;
			}

			var username = prompt('Username', 'lglossman');
			if (!username || username == '') {
				return;
			}

			var password = prompt('Password', 'qwerty');
			if (!password || password == '') {
				return;
			}

			SipManagerPlugin.connect({ // Conexión con el servidor SIP
				data : {
					domain : domain,
					username : username,
					password : password
				},
				error: function() {
					alert('error');
				},
				success: function() {
					alert('success');
				}
			});
		});

		$('#disconnect').on('click', function() {
			SipManagerPlugin.disconnect({
				error: function() {
					alert('error');
				}
			}); // Desconexión con el servidor SIP (debería haberse realizado una conexión exitosa antes!)
		});

		$('#makeCall').on('click', function() {

			var domain = prompt('Domain', 'iptel.org');
			if (!domain || domain == '') {
				return;
			}

			var username = prompt('Username', 'zgroup');
			if (!username || username == '') {
				return;
			}

			SipManagerPlugin.makeCall({ // Realizar una llamada
				data : {
					domain : domain,
					username : username
				},
				error: function() {
					alert('error');
				}
			});
		});

		$('#endCall').on('click', function() {
			SipManagerPlugin.endCurrentCall({
				error: function() {
					alert('error');
				}
			}); // Finalizar la llamada actual
		});

		$('#takeCall').on('click', function() {
			SipManagerPlugin.takeIncomingCall({
				error: function() {
					alert('error');
				}
			}); // Atender la llamada entrante
		});

		$('#rejectCall').on('click', function() {
			SipManagerPlugin.rejectIncomingCall({
				error: function() {
					alert('error');
				}
			}); // Rechazar la llamada entrante sin antenderla
		});

		$('#speakerModeOn').on('click', function() {
			SipManagerPlugin.setSpeakerMode({ // Habilitar el altoparlante
				data : {
					speakerMode : true
				},
				error: function() {
					alert('error');
				}
			});
		});

		$('#speakerModeOff').on('click', function() {
			SipManagerPlugin.setSpeakerMode({ // Deshabilitar el altoparlante
				data : {
					speakerMode : false
				},
				error: function() {
					alert('error');
				}
			});
		});

	}
};
