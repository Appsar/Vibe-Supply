export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/ /g, '-');
}

//Generate slug for url to display on detail page + still shows product id first then slug based on product title name
