export function dateCheck(created_at: string): boolean {
  const now = new Date();
  const created = new Date(created_at);

  const diffMs = now.getTime() - created.getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = diffMs / msPerDay;

  if (diffDays < 7) {
    return true;
  } else {
    return false;
  }
}

//Checks if a product has been added within 7 days
