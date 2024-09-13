import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})



export class CountryComponent implements OnInit {


  countries: any[] = [];
  // Initializing array for searching
  filteredCountries: any[] = [];
  searchText: string = '';
  // for dropdown filtration
  sortKey: string = 'name';
  selectedContinent: string = 'All'; // When nothing is selected then screen will show all country
  continents: string[] = ['All'];
  // for getter and setter
  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.filteredCountries = this.countries;

      // Now for Continents
      const continentSet = new Set(this.countries.flatMap(country => country.continents || []))

      this.continents.push(...Array.from(continentSet))

    })
  }
  // for searching via country name
  filterCountries(): void {
    this.filteredCountries = this.countries.filter(country =>
      // if there is any country in data which contain lower case
      country.name.common.toLowerCase().includes(this.searchText.toLowerCase()) &&
      // along with this filter function for search now we will also use the dropdown one also 
      (this.selectedContinent === 'All' || country.continents?.includes(this.selectedContinent))
    )
    // A sorting function 
    this.sortCountries();
  }

  sortCountries(): void {

    // now for sorting we can use comparatorsorting function

    this.filteredCountries.sort((a, b) => {
      if (a[this.sortKey] < b[this.sortKey]) return -1;
      if (a[this.sortKey] > b[this.sortKey]) return 1;
      return 0;
    });
  }
  onSortChange(e: Event): void {
    const selectElement = e.target as HTMLSelectElement;
    this.sortKey = selectElement.value;
    this.sortCountries();
  }
  onContinentChange(e: Event): void {
    const selectElement = e.target as HTMLSelectElement;

    this.selectedContinent = selectElement.value;
    this.filterCountries();
  }
}
