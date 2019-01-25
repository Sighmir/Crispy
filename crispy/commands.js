/**
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
*/

module.exports = {


  save_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      crispy.force_save()
      crispy.send_message('Training data has been saved!')
    }
  },

  ban_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (args[0] == 'word' || args[0] == 'words') {
          crispy.add_banned(words=args.slice(1))
          crispy.send_message(`Word(s) ${args.slice(1).join(', ')} have been added to the ban list!`)
        } else if (args[0] == 'user' || args[0] == 'user') {
          crispy.add_banned(users=args.slice(1))
          crispy.send_message(`User(s) ${args.slice(1).join(', ')} have been added to the ban list!`)
        } else {
          crispy.send_message('Please specify "word" or "user" as the second argument!')
          crispy.send_message('For example: !ban user crispy')
        }
      }
    }
  },

  unban_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (args[0] == 'word' || args[0] == 'words') {
          crispy.del_banned(words=args.slice(1))
          crispy.send_message(`Word(s) ${args.slice(1).join(', ')} have been removed from the ban list!`)
        } else if (args[0] == 'user' || args[0] == 'user') {
          crispy.del_banned(users=args.slice(1))
          crispy.send_message(`User(s) ${args.slice(1).join(', ')} have been removed from the ban list!`)
        } else {
          crispy.send_message('Please specify "word" or "user" as the second argument!')
          crispy.send_message('For example: !unban user crispy')
        }
      }
    }
  },

  clear_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (args[0] == 'word' || args[0] == 'words') {
          crispy.add_cleared(words=args.slice(1))
          crispy.send_message(`Word(s) ${args.slice(1).join(', ')} have been added to the cleared words list!`)
        } else if (args[0] == 'user' || args[0] == 'user') {
          crispy.add_cleared(users=args.slice(1))
          crispy.send_message(`User(s) ${args.slice(1).join(', ')} have been added to the cleared users list!`)
        } else {
          crispy.send_message('Please specify "word" or "user" as the second argument!')
          crispy.send_message('For example: !clear user crispy')
        }
      }
    }
  },

  unclear_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (args[0] == 'word' || args[0] == 'words') {
          crispy.del_cleared(words=args.slice(1))
          crispy.send_message(`Word(s) ${args.slice(1).join(', ')} have been removed from the cleared words list!`)
        } else if (args[0] == 'user' || args[0] == 'user') {
          crispy.del_cleared(users=args.slice(1))
          crispy.send_message(`User(s) ${args.slice(1).join(', ')} have been removed from the cleared users list!`)
        } else {
          crispy.send_message('Please specify "word" or "user" as the second argument!')
          crispy.send_message('For example: !unclear user crispy')
        }
      }
    }
  },

  silence_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (args[0] == 'word' || args[0] == 'words') {
          crispy.add_silenced(words=args.slice(1))
          crispy.send_message(`Word(s) ${args.slice(1).join(', ')} have been added to the silenced words list!`)
        } else if (args[0] == 'user' || args[0] == 'user') {
          crispy.add_silenced(users=args.slice(1))
          crispy.send_message(`User(s) ${args.slice(1).join(', ')} have been added to the silenced users list!`)
        } else {
          crispy.send_message('Please specify "word" or "user" as the second argument!')
          crispy.send_message('For example: !silence user crispy')
        }
      }
    }
  },

  unsilence_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (args[0] == 'word' || args[0] == 'words') {
          crispy.del_silenced(words=args.slice(1))
          crispy.send_message(`Word(s) ${args.slice(1).join(', ')} have been removed from the silenced words list!`)
        } else if (args[0] == 'user' || args[0] == 'user') {
          crispy.del_silenced(users=args.slice(1))
          crispy.send_message(`User(s) ${args.slice(1).join(', ')} have been removed from the silenced users list!`)
        } else {
          crispy.send_message('Please specify "word" or "user" as the second argument!')
          crispy.send_message('For example: !unsilence user crispy')
        }
      }
    }
  },

  close_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.add_closed(args)
        crispy.send_message(`User(s) ${args.join(', ')} have been added to the closed list!`)
      }
    }
  },

  unclose_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.del_closed(args)
        crispy.send_message(`User(s) ${args.join(', ')} have been removed from the closed list!`)
      }
    }
  },

  refresh_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      crispy.force_refresh()
    }
  },

  target_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.add_target(args)
        crispy.send_message(`User(s) ${args.join(', ')} have been added to targets!`)
      }
    }
  },

  untarget_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.del_target(args)
        crispy.send_message(`User(s) ${args.join(', ')} have been removed from targets!`)
      }
    }
  },

  admin_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.add_admin(args)
        crispy.send_message(`User(s) ${args.join(', ')} have been added to admins!`)
      }
    }
  },

  unadmin_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.del_admin(args)
        crispy.send_message(`User(s) ${args.join(', ')} have been removed from admins!`)
      }
    }
  },

  trigger_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.add_trigger(args)
        crispy.send_message(`Word(s) ${args.join(', ')} have been added to triggers!`)
      }
    }
  },

  untrigger_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.del_trigger(args)
        crispy.send_message(`Word(s) ${args.join(', ')} have been removed from triggers!`)
      }
    }
  },

  filter_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.add_filter(args.join(' '))
        crispy.send_message(`The phrase "${args.join(' ')}" have been added to filters!`)
      }
    }
  },

  unfilter_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.del_filter(args.join(' '))
        crispy.send_message(`The phrase "${args.join(' ')}" have been removed from filters!`)
      }
    }
  },

  wipe_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      crispy.force_wipe()
      crispy.send_message('Wiped sent messages cache!')
    }
  },

  crispy_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.answer_to(kwargs.user, args.join(' '))
      }
    }
  },

  forget_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.forget(args.join(' '))
        crispy.send_message(`Phrases containing "${args.join(' ')}" have been forgotten!`)
      }
    }
  },

  vocabulary_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (crispy.has_vocabulary(args[0])) {
          crispy.set_vocabulary(args[0])
          crispy.send_message(`Now using ${args[0]} vocabulary!`)
        } else {
          crispy.send_message(`Vocabulary ${args[0]} not found!`)
        }
      }
    }
  },

  config_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        let old_value = crispy[args[0]]
        if (old_value != null) {
          if (args.length > 1) {
            let new_value = ' '.join(args.slice(1))
            if (new_value.toLowerCase() == 'true') {
              new_value = true
            } else if (new_value.toLowerCase() == 'false') {
              new_value = false
            }
            try {
              let value = old_value.constructor(new_value)
              if (value) {
                crispy.update_config({ [args[0]]: value })
                crispy.send_message(`Updated config variable: ${args[0]} = ${new_value}`)
              }
            } catch {
              crispy.send_message(`Invalid value type: ${args[0]} = ${old_value}`)
            }
          } else {
            crispy.send_message(`Config variable: ${args[0]} = ${old_value}`)
          }
        } else {
          crispy.send_message(`Invalid value key: ${args[0]}`)
        }
      }
    }
  },

  color_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.color(args[0])
      }
    }
  },

  nick_command: (kwargs) => {
    let crispy = kwargs.crispy
    if (crispy) {
      let args = kwargs.args
      if (args) {
        crispy.nick(args[0])
      }
    }
  },

  admins_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    text = 'Admin users:'
    if (crispy) {
      for (user in crispy.admins) {
        if ((text+user).length < 200) {
          text = `${text} ${user}`
        } else {
          crispy.msg(user, text, false)
          text = ''
        }
      }
      crispy.msg(user, text)
    }
  },

  targets_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    text = 'Target users:'
    if (crispy) {
      for (user in crispy.targets) {
        if ((text+user).length < 200) {
          text = `${text} ${user}`
        } else {
          crispy.msg(user, text, false)
          text = ''
        }
      }
      crispy.msg(user, text)
    }
  },

  triggers_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    text = 'Trigger words:'
    if (crispy) {
      for (word in crispy.triggers) {
        if ((text+word).length < 200) {
          text = `${text} ${word}`
        } else {
          crispy.msg(user, text, false)
          text = ''
        }
      }
      crispy.msg(user, text)
    }
  },

  closed_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    let text = 'Closed users:'
    if (crispy) {
      for (user in crispy.closed_users) {
        if ((text+user).length < 200) {
          text = `${text} ${user}`
        } else {
          crispy.msg(user, text, false)
          text = ''
        }
      }
      crispy.msg(user, text)
    }
  },

  banned_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    if (crispy) {
      let args = kwargs.args
      if (args) {
        let lst = null
        let text = `Banned ${args[0]}:`
        if (args[0] == 'words') {
          lst = crispy.banned_words
        } else if (args[0] == 'users') {
          lst = crispy.banned_users
        }
        if (lst) {
          for (el in lst) {
            if ((text+el).length < 200) {
              text = `${text} ${el}`
            } else {
              crispy.msg(user, text, false)
              text = ''
            }
          }
          crispy.msg(user, text)
        } else {
          crispy.send_message(crispy.deny_message)
        }
      } else {
        crispy.send_message(crispy.deny_message)
      }
    }
  },

  cleared_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    if (crispy) {
      let args = kwargs.args
      if (args) {
        let lst = null
        let text = `Cleared ${args[0]}:`
        if (args[0] == 'words') {
          lst = crispy.cleared_words
        } else if (args[0] == 'users') {
          lst = crispy.cleared_users
        }
        if (lst) {
          for (el in lst) {
            if ((text+el).length < 200) {
              text = `${text} ${el}`
            } else {
              crispy.msg(user, text, false)
              text = ''
            }
          }
          crispy.msg(user, text)
        } else {
          crispy.send_message(crispy.deny_message)
        }
      } else {
        crispy.send_message(crispy.deny_message)
      }
    }
  },

  silenced_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    if (crispy) {
      let args = kwargs.args
      if (args) {
        let lst = null
        let text = `Silenced ${args[0]}:`
        if (args[0] == 'words') {
          lst = crispy.silenced_words
        } else if (args[0] == 'users') {
          lst = crispy.silenced_users
        }
        if (lst) {
          for (el in lst) {
            if ((text+el).length < 200) {
              text = `${text} ${el}`
            } else {
              crispy.msg(user, text, false)
              text = ''
            }
          }
          crispy.msg(user, text)
        } else {
          crispy.send_message(crispy.deny_message)
        }
      } else {
        crispy.send_message(crispy.deny_message)
      }
    }
  },

  help_command: (kwargs) => {
    let crispy = kwargs.crispy
    let user = kwargs.user
    if (crispy) {
      let args = kwargs.args
      if (args) {
        if (crispy.is_command(crispy.prefix+args[0])) {
          crispy.msg(user, crispy.command_help[args[0]])
        } else {
          crispy.send_message(crispy.deny_message)
        }
      } else {
        let text = 'Commands:'
        for (command in crispy.commands) {
          if ((text+command).length < 200) {
            text = `${text} ${command}`
          } else {
            crispy.msg(user, text, false)
            text = ''
          }
        }
        crispy.msg(user, text)
      }
    }
  }
}