# Frontier Simple Hop Payroll App

This is a simple tool to allow Hops to more easily do their job on the Frontier server, making tracking what worker joined when, when to next pay them, their salary, title and others trivial.

It is also capable of being a bank of all current station workers, provided it has been properly filled.

It is mostly meant to be a temporary solution i had made myself so as to make my life easier, awaiting i someday try to make it a PDA program, so don't expect much changes to this, and for it to stay barebones (hence the poor code quality).

To run it either clone the repo and run `npm start` if you have npm installed

You can also run `npm run build` to compile it to a vanilla website, and can run it by simply opening the html file.

If you do not have npm installed, or just want to run it, you can download the release build and simply open the html file contained at the root.

---

The data is stored locally in the cache, moving the file around or clearing the cache will result in loss of data.

However, as it is stored locally it can be recovered if the window / browser is closed.

It does mean you must manually remove entries at the end of shifts.

---

There's no actual tutorial for the app, basic gist is that you input a workers details in the form :
- Name for their name
- Title for the title of the job
- Pay amount is their salary per interval of time (Eg: 10k / hour -> 10000 in pay amount, do not use shortcuts with k, full numbers)
- Pay interval is the amount of time in minutes between each payout (Eg: 10k / hr -> 60)
- Bonus is non-mandatory, it may be used as a reminder for bonuses that were promised (Eg for mail workers : 200/Delivered letter, must bring opened letter as proof)
- Starting time is the time they've started their shift, it doesn't have to be the current time, you can say someone started 10 minutes ago (HoS and you haven't had time to add them in yet) or later (They want the job but must finish something first)


Once an employee is entered, they'll be fully tracked. 

---

Top right hand corner is the 'payout list', it tracks (at most 6 at once) employees who will be the next to be entitled to their salary (Denoting in green those who'll need salary in less than 10minutes for those who pay by longer intervals, and red those who are entitled to their salary)

In there, you'll find
- the persons name and title to identify them,
- how much money they're owed (Until now, using pay amount & interval)
- how long they've been working since their last paycheck
- as well as when was the last time they were owed their salary (or next if paid recently)

(Eg you pay someone every hour, they last got paid at 16:00 and it is currently 16:59, it'll show 17:00, if it is between 17:00 and 17:59 it'll also show 17:00, and for 18:01 it'll show 18:00, as they are owed two full hours)

Paying a worker will assume you pay them for all of the time they've worked,

Skipping their pay will only assume you want to skip a single pay interval (was SSD for example)

---

The bottom half lists all employees, with all of their information, similar to the payout list but also adding 

- The amount they've been paid so far this shift
- Their salary, and pay interval
- Buttons to edit title, salary, pay interval
- The bonus colum which contains the reasons for a bonus
- And a button to fire a worker (Permanent action, you can always reinput them but no data is saved)