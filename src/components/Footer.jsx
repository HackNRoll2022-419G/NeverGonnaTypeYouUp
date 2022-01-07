function Footer() {
  const githubLink =
    'https://github.com/HackNRoll2022-419G/never-gonna-type-you-up';

  const codeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 inline"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="px-2">
      <a
        href={githubLink}
        target="_blank"
        rel="noreferrer"
        className="hover:text-blue-300 transition ease-linear"
      >
        {codeIcon} <span className="align-middle">Github</span>
      </a>
    </div>
  );
}

export default Footer;
