# Crispy
An annoying bot.

This bot is being developed for personal use in my community's chatroom on https://jumpin.chat.

### Inspiration

I have this friend called Crispy and he talks a lot on chat, much faster than any of us can answer,
he didn't seen to care when we stopped trying to answer him too... he would just keep talking to himself... so I decided
to make a bot to keep up with him.

### History
- **Initial version**: The bot would send messages from Ipsum Lorem everytime the real Crispy talked.
- **English version**: A friend asked me to make it talk english, so I did with markovian chains.
- **Nov 18, 2018 - First commit**: After implementing some sort of machine learning I decided it should be on GitHub.
- **Nov 19~Dec 5, 2018**: Lots of improvements to code, speech, detection of messages, plus fixes and new commands.
- **Dec 6~12, 2018**: Added bot account that can be modded and profile validation for admin commands.
- **Dec 13~16, 2018**: Fixed login issues and other errors and improves ban function.
- **Dec 21~22, 2018**: Prepared for public release, removed personal files, made improvements and lots of refactoring.
- **Jan 24~26, 2019**: Released it for NodeJS to make the training asynchronous, and other improvements.

## Requirements
This project uses [chromedriver](https://www.npmjs.com/package/chromedriver),
[node-markovify](https://www.npmjs.com/package/node-markovify), [pos](https://www.npmjs.com/package/pos),
[sequencematcher](https://www.npmjs.com/package/sequencematcher) and [webdriverio](https://www.npmjs.com/package/sequencematcher)
those can be installed with `npm install` following the installation instructions.  
This project was made using **NodeJS v10.3.0**, it was **not tested** for any other versions.

## Installation
- If you wish to run the example:
  - Clone this repository with `git clone git@github.com:Sighmir/Crispy.git`
  - Go to the repository folder with `cd Crispy`
  - Install needed libraries with `npm install`
  - Execute the example with `npm start`

- If you wish to make your own:
  - Just run `npm install crispy` in your project folder

## Vocabulary
Vocabulary files should be located inside the folder *models*.

#### Parameters
- **file**: Vocabulary file.
- **state_size**: Markovian state size.
- **training**: If True bot will add chat messages to it's vocabulary (can only be used for type *line* and *json*).

## Commands
Default prefix for commands is *!*. More commands can be created with custom functions.
- **help** \[*&lt;command>*\]: Private message the list of commands or specific help about a command.
- **save**: Saves training data and cleans cached messages.
- **ban** *&lt;users|words>* *&lt;targets>*: Add users or words to the banned list.
  - **ban** *&lt;users>*: Make the bot ban every user named exctly like *&lt;targets>*.
  - **ban** *&lt;words>*: Make the bot ban every user, by message or username, containing *&lt;targets>*.
- **unban** *&lt;users|words>* *&lt;targets>*: Remove users or words from the banned list.
- **clear** *&lt;users|words>* *&lt;targets>*: Add users or words to the cleared list.
- **unclear** *&lt;users|words>* *&lt;targets>*: Remove users or words from the cleared list.
- **silence** *&lt;users|words>* *&lt;targets>*: Add users or words to the silenced list.
- **unsilence** *&lt;users|words>* *&lt;targets>*: Remove users or words from the silenced list.
- **close** *&lt;usernames>*: Add users to the closed list, the bot will close his cam automatically.
- **unclose** *&lt;usernames>*: Remove users from the closed list.
- **refresh**: Make the bot refresh the page.
- **target** *&lt;usernames>*: Add users to the targets list, the bot will answer those users.
- **untarget** *&lt;usernames>*: Remove users from the targets list.
- **admin** *&lt;usernames>*: Add users to the admins list, the bot will accept commands from those users.
- **unadmin** *&lt;usernames>*: Remove users from the admins list.
- **trigger** *&lt;words>*: Add words to the triggers list, the bot will answer to those words.
- **untrigger** *&lt;words>*: Remove words from the triggers list.
- **filter** *&lt;phrase>*: Add a phrase to the filters list, the bot won't process messages containing that phrase.
- **unfilter** *&lt;phrase>*: Remove a phrase from the filters list.
- **wipe**: Wipe sent messages cache.
- **crispy** *&lt;phrase>*: Make the bot answer to a phrase without being targeted.
- **forget** *&lt;phrase>*: Make the bot forget phrases from training data containg *&lt;phrase>*.
- **vocabulary** *&lt;name>*: Set the bot vocabulary.
- **config** *&lt;key>* *&lt;value>*: Set config variable.
- **nick** *&lt;name>*: Set the bot nickname.
- **color**: Changes the bot chat color.
- **closed**: Private messages the closed users list.
- **banned** *&lt;users|words>*: Private messages the banned users/words list.
- **cleared** *&lt;users|words>*: Private messages the cleared users/words list.
- **silenced** *&lt;users|words>*: Private messages the silenced users/words list.
- **targets**: Private messages the target users list.
- **triggers**: Private messages the trigger words list.
- **admins**: Private messages the admin users list.

## Configuration
The configuration variables can be set in config.json. The default file has the most important variables.
- **username**: The bot account username, can be set with environment variable CRISPY_USERNAME. *(Default: None)*
- **password**: The bot account password, can be set with environment variable CRISPY_PASSWORD. *(Default: None)*
- **bot**: The bot username. *(Default: Crispybot)*
- **room**: Which room the bot should enter. *(Default: crispybot)*
- **url**: The room url, it's also generated automatically by the room variable. *(Default: https://jumpin.chat/crispybot)*
- **login_url**: The login page url. *(Default: https://jumpin.chat/login)*
- **max_tries**: Max tries to make a phrase based on input form chat. *(Default: 10)*
- **max_len**: Max length of generated phrases. *(Default: 60)*
- **min_len**: Minimum length of generated phrases. *(Default: 10)*
- **max_cache**: Maximum cache size for generated messages. To generate every message from chat use default. *(Default: 0)*
- **refresh_interval**: Interval in minutes between each refresh. *(Default: 10)*
- **sleep_interval**: Sleep interval used in most actions of the bot, change global speed. *(Default: 0.1)*
- **wipe_interval**: Interval in minutes between each sent messages cache wipe. *(Default: 10)*
- **save_interval**: Interval in minutes between each save and cache cleanup for vocabulary data. *(Default: 10)*
- **case_sensitive**: If uppercase letters and lowercase letters will be considered when generating phrases. *(Default: True)*
- **similarity_score**: Similarity score necessary between generated message and last message to be accepted. *(Default: 0.5)*
- **triggers**: List of words that will trigger answers from the bot even for non-targeted users. *(Default: [])*
- **closed_users**: List of usernames that should be closed automatically after camming up. *(Default: [])*
- **banned_users**: List of usernames that should be banned automatically when joining the room. *(Default: [])*
- **banned_words**: List of banned words, the bot will ban every user, by message or username with those words. *(Default: [])*
- **cleared_users**: List of usernames that should be cleared automatically after sending a message. *(Default: [])*
- **cleared_words**: List of words that should be cleared automatically after appearing in a message. *(Default: [])*
- **silenced_users**: List of usernames that should be silenced automatically after sending a message. *(Default: [])*
- **silenced_words**: List of words, the bot will silence every user, by message or username with those words. *(Default: [])*
- **targets**: List of targeted users that will always have your messages answered by the bot. *(Default: [])*
- **name_change**: Name change message sent by the website. *(Default: changed their name to)*
- **filter**: Messages containing phrases from this list won't be processed by the bot answering mechanism. *(Default: [])*
- **deny_message**: Message sent by the bot when denying a command. *(Default: /shrug)*
- **ban_command**: Ban command used on the website. *(Default: /ban)*
- **ban_message**: Message sent after banning an user. *(Default: /shrug)*
- **unban_command**: Unban command used on the website. *(Default: /unban)*
- **unban_message**: Message sent after unbanning someone. *(Default: /shrug)*
- **close_command**: Close command used on the website. *(Default: /close)*
- **close_message**: Message sent after closing someone. *(Default: /shrug)*
- **clear_command**: Clear command used on the website. *(Default: /clear)*
- **clear_message**: Message sent after clearing the chat. *(Default: /shrug)*
- **silence_command**: Silence command used on the website. *(Default: /silence)*
- **silence_message**: Message sent after silencing someone. *(Default: /shrug)*
- **msg_command**: Private message command used on the website. *(Default: /msg)*
- **msg_message**: Message sent after messaging someone. *(Default: /shrug)*
- **action_command**: Action command used on the website. *(Default: /action)*
- **action_message**: Message sent after an action. *(Default: /shrug)*
- **nick_command**: Nick command used on the website. *(Default: /nick)*
- **nick_message**: Message sent after changing nickname. *(Default: /shrug)*
- **color_command**: Color command used on the website. *(Default: /color)*
- **color_message**: Message sent after changing color. *(Default: /shrug)*
- **clear_banned**: Clear chat after ban by word. *(Default: False)*
- **trigger_sensitivity**: Sensitivity of the trigger words detection. *(Default: 0.0)*
- **target_sensitivity**: Sensitivity of the target dectection. *(Default: 0.5)*
- **admins**: List of bot admin accounts that have access to commands. *(Default: [])*
- **prefix**: Prefix for bot commands. *(Default: !)*
- **debug**: If set to True the bot will run on a visible chrome window. *(Default: False)*

## Contact

Please if you find any bugs let me know by creating an issue on GitHub.
The bot is still under development so some of it's features are not fully tested and need improvements.

## License

```
Crispy - An annoying bot.
Copyright (C) 2018  Guilherme Caulada (Sighmir)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
