const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
    it('should return the movie that has been added', async () => {
      favoriteRestaurant.putRestaurant({ id: 1 });
      favoriteRestaurant.putRestaurant({ id: 2 });
   
      expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
      expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
      expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
    });
   
    it('should refuse a movie from being added if it does not have the correct property', async () => {
      favoriteRestaurant.putRestaurant({ aProperty: 'property' });
   
      expect(await favoriteRestaurant.getAllRestaurant()).toEqual([]);
    });
   
    it('can return all of the movies that have been added', async () => {
      favoriteRestaurant.putRestaurant({ id: 1 });
      favoriteRestaurant.putRestaurant({ id: 2 });
   
      expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }, { id: 2 }]);
    });
   
    it('should remove favorite movie', async () => {
      favoriteRestaurant.putRestaurant({ id: 1 });
      favoriteRestaurant.putRestaurant({ id: 2 });
      favoriteRestaurant.putRestaurant({ id: 3 });
   
      await favoriteRestaurant.deleteRestaurant(1);
   
      expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 2 }, { id: 3 }]);
    });
   
    it('should handle request to remove a movie even though the movie has not been added', async () => {
      favoriteRestaurant.putRestaurant({ id: 1 });
      favoriteRestaurant.putRestaurant({ id: 2 });
      favoriteRestaurant.putRestaurant({ id: 3 });
   
      await favoriteRestaurant.deleteRestaurant(4);
   
      expect(await favoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
    
    it('should be able to search for restaurants', async () => {
      favoriteRestaurant.putRestaurant({ id: 1, title: 'film a'});
      favoriteRestaurant.putRestaurant({ id: 2, title: 'film b'});
      favoriteRestaurant.putRestaurant({ id: 3, title: 'film abc'});
      favoriteRestaurant.putRestaurant({ id: 4, title: 'ini mah film abcd'});

      expect(await favoriteRestaurant.searchRestaurant('film a')).toEqual([
        { id: 1, title: 'film a'},
        { id: 3, title: 'film abc'},
        { id: 4, title: 'ini mah film abcd'},
      ]);
    });
  };
  export { itActsAsFavoriteRestaurantModel };