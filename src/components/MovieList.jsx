function MovieList(props) {
  return props.movies.map((movie) => (
    <label
      key={movie.id}
      className="flex items-start gap-3 p-1  rounded-md cursor-pointer hover:bg-gray-50 "
    >
      <input
        type="radio"
        name="option"
        value={movie.id}
        checked={props.titleSelect === movie.id}
        onChange={(event) => props.setTitleSelect(event.target.value)}
        className="hidden"
      />
      {/*custom radio เองให้เป็นสีขาวแบบ design*/}
      <span
        className={`m-[4px] h-4 w-4 rounded-full border flex items-center justify-center ${
          props.titleSelect === movie.id
            ? "border-gray-900"
            : "border-gray-400 bg-white"
        }`}
      >
        {props.titleSelect === movie.id && (
          <span className="h-2 w-2 rounded-full bg-gray-900" />
        )}
      </span>

      <div className="text-left">
        <p className="font-medium text-gray-900">
          {movie.title} ({movie.year})
        </p>
        <p className="text-sm text-gray-500">Director: {movie.director}</p>
      </div>
    </label>
  ));
}

export default MovieList;
