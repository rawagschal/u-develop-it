# Employee Tracker

## Description

A command line CMS bulit with Node.js, Inquirer, and MySQL to track and update a company's employee database.

Check out the walkthrough [here](https://youtu.be/cdlbFh71EGw)

## Table of Contents

* [License](#license)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Contributions](#contributions)
* [Tests](#tests)


## License
    
[![license badge](https://img.shields.io/static/v1?label=license&message=MIT&color=important)](https://opensource.org/licenses/MIT)

## Installation

If you already have Node.js and MySQL installed, download a zip or clone the original repo, and run `npm i` to install neccessary packages.

## Usage

Replace the root password for MySQL with your personal root password in `db/connection.js`

Run `npm run schema` to set up your database with predefined "Employee", "Department" and "Role" tables.

Run `npm run seed` to populate your database with example data.

Log in to MySQL and run `USE employees` to finish setting up the database.

Run `node index` from your commamnd line to start the application.

## Credits

[Console.table](https://momentjs.com/docs/#/displaying/) for the absolutely stunning command line user interface.

## Contributions

Fork it, or open an issue on the original repo.

## Tests

This application does not include any tests, feel free to write your own.

## Contact

Questions, comments, or conerns? Find me on [GitHub](https://github.com/rawagschal/) or [send me an email](mailto:rawagschal@gmail.com).