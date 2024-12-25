export const Status =
    [
        {
            label: 'Active',
            value: '1',
            isSelected: true
        },
        {
            label: 'In-Active',
            value: '0'
        }
    ]


export const sortingComparator = (valueA, valueB) => {

    if (valueA == null || valueB == null) {

      if (valueA == null && valueB == null) {
        return 0;
      } else if (valueA == null) {
        return -1;
      } else {
        return 1;
      }
    }

    const lowercaseValueA = typeof valueA === 'string' ? valueA?.toLowerCase():valueA;
    const lowercaseValueB = typeof valueB === 'string' ? valueB?.toLowerCase():valueB;
    if (lowercaseValueA === lowercaseValueB) {
      return 0;
    } else if (lowercaseValueA < lowercaseValueB) {
      return -1;
    } else {
      return 1;
    }
  }    
