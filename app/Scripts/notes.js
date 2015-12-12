$('document').ready(function () {
	var notesController = {
		getData: function() {
			$.post("/notes", { email : loggedUserEmail })
				.done(function (data) {
					notesView.init(data);
				});
		}
	}
	
	var notesView = {
		init: function (data) {
			data.forEach(this.addNote);
		},
		addNote: function (note) {
			var noteDivId = 'note_' + note.userEmail;
			var date = new Date(note.date);
			var text = note.text;
			if(text.length > 100) {
				text = text.substring(0, 100);
				text += '...';
			}
			$('#notesList').append('<div id="' + noteDivId + '" class="single-note">'
				+ '<div class="header"><strong>' + date + '</strong></div>'
				+ '<div class="content">' + text + '</div>'
				+ '<a class="btn btn-primary single-note-edit" href="/editnote?_id=' 
				+ note._id + '&email=' + loggedUserEmail + '">Edit</a>'
				+ '</div>');
		}
	}
	
	var init = function() {
		notesController.getData();
	}
	
	init();
});