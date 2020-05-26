# DENO API WITH OAK 🦕

GoBarber from Rocketseat Bootcamp 🚀

A simple [Deno](https://deno.land/) REST API created with [Oak](https://oakserver.github.io/oak/) for study and fun, because [Deno is new](https://deno.land/v1), is hype and have a very cute mascot!

❗ This is a work in progress.

❗ I stole this readme from [Marcus Ortense](https://github.com/ortense).

![Deno artwork by hashrock](https://deno.land/v1_wide.jpg)

#Routes

To get all appointments, use a method :`GET /appointment` (Disclaimer: For now, I use Local variable to save appointments, integrate of a database is on my roadmap)

To create an appointment, use a method :`POST /appointment` with this `JSON` body

```
{
	"provider": string,
	"date": Date"
}
```
