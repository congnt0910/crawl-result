## Cron-style Scheduling

	
	*    *    *    *    *    *
	┬    ┬    ┬    ┬    ┬    ┬
	│    │    │    │    │    |
	│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
	│    │    │    │    └───── month (1 - 12)
	│    │    │    └────────── day of month (1 - 31)
	│    │    └─────────────── hour (0 - 23)
	│    └──────────────────── minute (0 - 59)
	└───────────────────────── second (0 - 59, OPTIONAL)
	
#### VD

* lặp sau mỗi 1 giây: 

		* * * * * *
	
* lặp sau mỗi 2 giây: 

		*/2 * * * * *

* lặp sau mỗi 1 phút: 

		* * * * * 

	hoặc 
	
		0 */1 * * * *

	
	

