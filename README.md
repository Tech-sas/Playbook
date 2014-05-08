Tech-sas Playbook
=======================

Live app running at [http://techsas-playbook.herokuapp.com/](http://techsas-playbook.herokuapp.com/)

---

This is a single page app to facilitate sharing information to attendants of [Welcome to Tech-sas, a Hackathon by the Houston Community, for the Community](http://techsas.co).

### JavaScript in the front, Markdown in the back.

![http://cl.ly/image/3b1j470j2R1y/mullet-ratio.jpg](http://cl.ly/image/3b1j470j2R1y/mullet-ratio.jpg)

This is our playbook for launching, operating, *ing "Welcome to Tech-sas".

The app itself is data driven from the Markdown files in the ["/src" directory](./src). Here are some common things to keep in mind when migrating the project to a new purpose (Curriculum, Questionnaires, etc):

1. The ["/src" directory](./src) should consist of a series of folders with numeric names, prefixed with chapter numbers.
2. The app will display a tag and title for each main folder.
3. Don't delete [archive.md](./src/archive.md) in the ["/src" directory](./src).

#### Want to edit content in your browser?

Try [Prose.io](http://prose.io) with your Github account.

#### Want to run this locally?

- run `npm install` to install dependencies
- Download and install Heroku's toolbelt: [https://toolbelt.heroku.com/](https://toolbelt.heroku.com/)
- Then run `foreman start`
- Open your browser to `http://localhost:5000`

#### Shoutouts about "Welcome to Tech-sas"

- [StartupDigest](http://us1.campaign-archive1.com/?u=92be899ef5a892c60b4a6cd97&id=49f16c2093&e=16e90952db)
- http://techsas.co/
- http://lanyrd.com/2014/welcometotechsas/
