import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import styles from '../styles/Home.module.css'
import { a, useSpring } from '@react-spring/three'
import { useControls } from 'leva'
import { CurveModifier } from '@react-three/drei'
import { CatmullRomCurve3, Vector3 } from 'three'

function Sphere(props) {
	const ref = useRef()
	const curveRef = useRef()
	const points = useMemo(() => ([
			new Vector3(-2, -3, -1),
			new Vector3(4, 0, -2),
			new Vector3(5.2, 6, -5),
			new Vector3(-2.8, 1, -2)
		]), [])
	useFrame(() => {
		if (curveRef.current) {
			curveRef.current.moveAlongCurve(0.01)
		}
	})
	const curve = useMemo(() => {
		return new CatmullRomCurve3([...points], true, 'centripetal', .5)
	}, [points])
	return (
		<CurveModifier ref={curveRef} curve={curve}>
			<a.mesh
				castShadow
				// {...props}
				ref={ref}
			>
				<sphereGeometry args={[.5, 32, 16]} />
				<meshStandardMaterial color={'rgb(252, 202, 3)'} />
			</a.mesh>
		</CurveModifier>
	)
}

function Plane(props) {
  return(
	<mesh
		{...props}
		receiveShadow
	>
		<planeGeometry args={props.size} />
		<meshStandardMaterial color={props.color} />
	</mesh>
  )
}

export default function Home() {

	return (
		<Canvas shadows>
			<ambientLight intensity={.9} />
			<pointLight position={[3, 7, -10]} />
			<Plane position={[5, 20.2, -15]} rotation={[0, .8, 0]} color='#FF4B1E' size={[90, 50]} />
			<Plane position={[5, 22.58, 1]} rotation={[0, -2.1, 0]} color='#FF5A1E' size={[50, 50]} />
			<Plane position={[5, -9, -33]} rotation={[5, -.01, -.3]} color='#FF6830' size={[90, 60]} />
			<Sphere position={[-2, -3, -1]} />
			{/* <Sphere position={[4, 0, -2]} /> */}
			{/* <Sphere position={[5.2, 6, -5]} /> */}
			{/* <Sphere position={[-2.8, 1, -2]} /> */}
		</Canvas>
	)
}
