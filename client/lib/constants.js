// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Meteor Boilerplate',
  DESCRIPTION: 'A boilerplate for meteorjs projects http://matteodem.github.io/meteor-boilerplate/'
};

TAGS = {
	"mongodb": true,
	"html": true,
	"javascript": true,
	"node.js": true,
	"meteor": true,
	"css": true,
	"git": true,
	"github": true,
	"bitbucket": true,
	"template": true,
	"view": true
}

LEVEL_SCALE = [
    "I've done a tutorial",
    "I've done a couple tutorials",
    "I've built a project with it",
    "I've built multiple projects with it",
    "I'm an expert"
]