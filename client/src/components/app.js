import React,{useState, useEffect} from 'react';

export default function App() {

	const [content, setContent] = useState();

	useEffect(() => {
		fetch('http://localhost:5000')
		.then(res => res.text())
		.then(text => setContent(text));
	});

  return (
    <div className="App">
			{content}
    </div>
  );
}
