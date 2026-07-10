declare namespace StudyLibrary {
  type User = {
    readonly id: string;
    readonly name: string;
  };

  function createUserLabel(user: User): string;
}
